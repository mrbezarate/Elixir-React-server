FROM elixir:1.15-alpine

RUN apk update && \
    apk add --no-cache build-base npm git inotify-tools bash

# Install hex and rebar
RUN mix local.hex --force && \
    mix local.rebar --force

WORKDIR /app

# Install mix dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get && mix deps.compile

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "mix setup && mix phx.server"]
