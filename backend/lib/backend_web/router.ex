defmodule BackendWeb.Router do
  use BackendWeb, :router

 pipeline :api do
  plug :accepts, ["json"]
  plug CORSPlug, origin: "*"
end

scope "/api", BackendWeb do
  pipe_through :api

  post "/register", AuthController, :register
  post "/login", AuthController, :login

  get "/tasks", TaskController, :index
  post "/tasks", TaskController, :create
end

end
