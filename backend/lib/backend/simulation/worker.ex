defmodule Backend.Simulation.Worker do
  use GenServer
  require Logger

  # State: :idle, :processing, :success, :error
  
  def start_link(opts) do
    id = Keyword.get(opts, :id)
    GenServer.start_link(__MODULE__, id, name: via_tuple(id))
  end

  def via_tuple(id) do
    {:via, Registry, {Backend.WorkerRegistry, id}}
  end

  def simulate_load(id) do
    case Registry.lookup(Backend.WorkerRegistry, id) do
      [{pid, _}] -> GenServer.cast(pid, :process_task)
      _ -> :error
    end
  end

  def kill_worker(id) do
    case Registry.lookup(Backend.WorkerRegistry, id) do
      [{pid, _}] -> Process.exit(pid, :kill)
      _ -> :error
    end
  end

  def get_state(id) do
    case Registry.lookup(Backend.WorkerRegistry, id) do
      [{pid, _}] -> GenServer.call(pid, :get_state)
      _ -> nil
    end
  end

  defp update_metrics(id, status) do
    :ets.insert(:worker_metrics, {id, status})
  end

  @impl true
  def init(id) do
    state = %{id: id, status: :idle}
    update_metrics(id, :idle)
    {:ok, state}
  end

  @impl true
  def handle_call(:get_state, _from, state) do
    {:reply, state, state}
  end

  @impl true
  def handle_cast(:process_task, %{status: :idle} = state) do
    new_state = %{state | status: :processing}
    update_metrics(state.id, :processing)

    work_time = :rand.uniform(1000) + 100
    Process.send_after(self(), :finish_task, work_time)

    {:noreply, new_state}
  end
  def handle_cast(:process_task, state), do: {:noreply, state}

  @impl true
  def handle_info(:finish_task, state) do
    status = if :rand.uniform(100) <= 5, do: :error, else: :success
    new_state = %{state | status: status}
    update_metrics(state.id, status)

    Process.send_after(self(), :reset_idle, 500)

    {:noreply, new_state}
  end

  def handle_info(:reset_idle, state) do
    new_state = %{state | status: :idle}
    update_metrics(state.id, :idle)
    {:noreply, new_state}
  end
end
