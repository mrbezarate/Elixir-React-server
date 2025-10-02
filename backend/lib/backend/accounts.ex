defmodule Backend.Accounts do

  alias Backend.Repo
  alias Backend.Accounts.User

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def authenticate_user(email, password) do
    user = get_user_by_email(email)

    case user do
      nil ->
        {:error, :not_found}
      user ->
        if User.verify_password(user, password) do
          {:ok, user}
        else
          {:error, :invalid_password}
        end
    end
  end
end
