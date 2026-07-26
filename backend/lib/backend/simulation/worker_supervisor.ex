defmodule Backend.Simulation.WorkerSupervisor do
  use DynamicSupervisor

  def start_link(init_arg) do
    DynamicSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  @impl true
  def init(_init_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def start_worker(id) do
    spec = %{
      id: {Backend.Simulation.Worker, id},
      start: {Backend.Simulation.Worker, :start_link, [[id: id]]},
      restart: :permanent
    }
    DynamicSupervisor.start_child(__MODULE__, spec)
  end
end
