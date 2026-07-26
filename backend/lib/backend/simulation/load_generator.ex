defmodule Backend.Simulation.LoadGenerator do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def spawn_workers(count) do
    GenServer.cast(__MODULE__, {:spawn_workers, count})
  end

  def simulate_spike do
    GenServer.cast(__MODULE__, :simulate_spike)
  end

  def kill_random(count) do
    GenServer.cast(__MODULE__, {:kill_random, count})
  end

  def get_active_count do
    GenServer.call(__MODULE__, :get_active_count)
  end

  @impl true
  def init(_) do
    :timer.send_interval(500, :random_load)
    {:ok, %{total_spawned: 0}}
  end

  @impl true
  def handle_cast({:spawn_workers, count}, state) do
    start_id = state.total_spawned + 1
    end_id = state.total_spawned + count

    Enum.each(start_id..end_id, fn id ->
      Backend.Simulation.WorkerSupervisor.start_worker(id)
    end)

    {:noreply, %{state | total_spawned: state.total_spawned + count}}
  end

  def handle_cast(:simulate_spike, state) do
    if state.total_spawned > 0 do
      Enum.each(1..state.total_spawned, fn id ->
        if :rand.uniform(10) <= 8 do
          Backend.Simulation.Worker.simulate_load(id)
        end
      end)
    end
    {:noreply, state}
  end

  def handle_cast({:kill_random, count}, state) do
    if state.total_spawned > 0 do
      Enum.each(1..count, fn _ ->
        id = :rand.uniform(state.total_spawned)
        Backend.Simulation.Worker.kill_worker(id)
      end)
    end
    {:noreply, state}
  end

  @impl true
  def handle_call(:get_active_count, _from, state) do
    {:reply, state.total_spawned, state}
  end

  @impl true
  def handle_info(:random_load, state) do
    if state.total_spawned > 0 do
      id = :rand.uniform(state.total_spawned)
      Backend.Simulation.Worker.simulate_load(id)
    end
    {:noreply, state}
  end
end
