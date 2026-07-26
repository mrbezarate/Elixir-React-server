defmodule BackendWeb.SimulationChannel do
  use BackendWeb, :channel
  require Logger

  @impl true
  def join("simulation:lobby", _payload, socket) do
    if authorized?(socket) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  defp authorized?(_socket), do: true

  @impl true
  def handle_in("spawn_workers", %{"count" => count}, socket) do
    Backend.Simulation.LoadGenerator.spawn_workers(count)
    {:noreply, socket}
  end

  @impl true
  def handle_in("simulate_spike", _payload, socket) do
    Backend.Simulation.LoadGenerator.simulate_spike()
    {:noreply, socket}
  end

  @impl true
  def handle_in("kill_random", %{"count" => count}, socket) do
    Backend.Simulation.LoadGenerator.kill_random(count)
    {:noreply, socket}
  end

  @impl true
  def handle_in("purge_cluster", _payload, socket) do
    Registry.select(Backend.WorkerRegistry, [{{:"$1", :"$2", :_}, [], [:"$2"]}])
    |> Enum.each(fn pid -> Process.exit(pid, :kill) end)
    {:noreply, socket}
  end
end
