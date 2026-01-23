# rafalbrauner

## General

### Tools versions

- PHP ^8.5
- PHP extensions (install all to satisfy `symfony check:requirements`)
- Composer ^2

## Dev

### Requirements

- Docker

### Getting started

1. Clone repository: `git clone git@github.com:rbrauner/rafalbrauner.git`
2. Enter project folder: `cd rafalbrauner`
3. Run `just init`

### Run

```bash
docker compose start
```

App will be available on [https://rafalbrauner.localhost](https://rafalbrauner.localhost) (remember to configure reverse proxy).

At the end of the work run:

```shell
docker compose stop
```

### Useful commands

- `docker compose start` - start containers
- `docker compose stop` - stop containers
- `just --list` - list tasks

## Prod

WIP
