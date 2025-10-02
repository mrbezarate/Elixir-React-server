defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :username, :string

    timestamps(type: :utc_datetime)
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password, :username])
    |> validate_required([:email, :password])
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/, message: "must be a valid email address")
    |> validate_length(:password, min: 6, message: "must be at least 6 characters")
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    # В реальном приложении используйте более безопасный метод хеширования
    salt = :crypto.strong_rand_bytes(16)
    hash = :crypto.hash(:sha256, password <> salt)
    password_hash = Base.encode64(salt) <> "$" <> Base.encode64(hash)
    change(changeset, %{password_hash: password_hash})
  end

  defp put_password_hash(changeset), do: changeset

  def verify_password(user, password) do
    case String.split(user.password_hash, "$") do
      [salt_base64, hash_base64] ->
        salt = Base.decode64!(salt_base64)
        hash = Base.decode64!(hash_base64)
        :crypto.hash(:sha256, password <> salt) == hash
      _ ->
        false
    end
  end
end
