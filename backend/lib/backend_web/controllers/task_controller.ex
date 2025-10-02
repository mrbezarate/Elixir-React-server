defmodule BackendWeb.TaskController do
  use BackendWeb, :controller

  # безопасно получить Agent или пустой список
  defp get_tasks do
    case Process.whereis(:task_agent) do
      nil -> []
      pid -> Agent.get(pid, & &1)
    end
  end

  # гарантированно стартануть агент, если ещё не запущен
  defp ensure_agent_started do
    if Process.whereis(:task_agent) == nil do
      {:ok, _} = Agent.start_link(fn -> [] end, name: :task_agent)
    else
      :ok
    end
  end

  def index(conn, _params) do
    tasks = get_tasks()
    json(conn, tasks)    # отправляем ровно один ответ
  end

  def create(conn, %{"title" => title}) do
    ensure_agent_started()
    Agent.update(:task_agent, fn tasks -> [%{title: title} | tasks] end)
    json(conn, %{status: "ok"})
  end

  # на случай, если пришлют тело не в формате JSON
  def create(conn, _params) do
    send_resp(conn, 400, "bad request")
  end
end
