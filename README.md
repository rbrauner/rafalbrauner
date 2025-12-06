# rafalbrauner

## General

### Tools versions

- PHP ^8.4
- PHP extensions (install all to satisfy `symfony check:requirements`)
- Composer ^2

### TODO

## Dev

### Requirements

- Docker

### Getting started

1. Clone repository: `git clone git@github.com:rbrauner/rafalbrauner.git`
2. Enter project folder: `cd rafalbrauner`
3. Run `make init`

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
- `docker compose stop` - start containers
- `make php-composer-install` - install php dependencies
- `make php-composer-update` - update php dependencies
- `make php-composer-normalize` - normalize composer.json
- `make php-clear` - clear cache and logs
- `make php-clear-cache` - clear cache
- `make php-clear-logs` - clear logs
- `make php-check` - check code
- `make php-check-security` - check security
- `make php-fix` - fix code
- `make php-test-all` - run tests
- `make php-test-unit` - run unit tests
- `make php-test-integration` - run integration tests
- `make php-doctrine-migrations-migrate` - migrate database
- `make php-prepare-database ENV="test"` - prepare database for given environment
