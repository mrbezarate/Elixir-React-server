defmodule Backend.Simulation.MetricsAggregator do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @impl true
  def init(_) do
    # Create ETS table for fast writes from 10k+ workers
    :ets.new(:worker_metrics, [:set, :public, :named_table, write_concurrency: true])
    
    # Poll every 100ms (10 FPS update rate to frontend for smooth aggregation)
    :timer.send_interval(100, :aggregate_and_broadcast)
    
    {:ok, %{rps_history: []}}
  end

  @impl true
  def handle_info(:aggregate_and_broadcast, state) do
    # Count stats
    stats = %{idle: 0, processing: 0, success: 0, error: 0, total: 0}
    
    stats = :ets.foldl(fn {_id, status}, acc ->
      Map.update(acc, status, 1, &(&1 + 1))
      |> Map.update!(:total, &(&1 + 1))
    end, stats, :worker_metrics)

    # Calculate simulated RPS based on success/error rates
    # (Just a rough visualization metric)
    rps = (stats.success + stats.error) * 10
    
    Phoenix.PubSub.broadcast(Backend.PubSub, "simulation", {:metrics_update, %{
      stats: stats,
      rps: rps,
      timestamp: System.system_time(:millisecond)
    }})

    {:noreply, state}
  end
end
