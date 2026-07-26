defmodule BackendWeb.SimulationChannel do
  use Phoenix.Channel
  require Logger

  @impl true
  def join("simulation", _payload, socket) do
    # Subscribe to the simulation updates
    Phoenix.PubSub.subscribe(Backend.PubSub, "simulation")

    # Send initial state (total workers count, or maybe all their states)
    # For a large number, getting all states one by one could be slow,
    # but for 200 it's fine. We'll just send the total count for now, and the UI
    # will build the nodes.
    count = Backend.Simulation.LoadGenerator.get_active_count()
    {:ok, %{active_workers: count}, socket}
  end

  @impl true
  def handle_info({:metrics_update, payload}, socket) do
    push(socket, "metrics_update", payload)
    {:noreply, socket}
  end

  # Handle UI actions
  @impl true
  def handle_in("spawn_workers", %{"count" => count}, socket) do
    Backend.Simulation.LoadGenerator.spawn_workers(count)
    # Broadcast new count
    new_count = Backend.Simulation.LoadGenerator.get_active_count() + count
    broadcast(socket, "system_stats", %{active_workers: new_count})
    {:noreply, socket}
  end

  def handle_in("simulate_spike", _, socket) do
    Backend.Simulation.LoadGenerator.simulate_spike()
    {:noreply, socket}
  end

  def handle_in("kill_random", %{"count" => count}, socket) do
    Backend.Simulation.LoadGenerator.kill_random(count)
    {:noreply, socket}
  end
end
