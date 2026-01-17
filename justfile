# https://just.systems

# ========
# = vars =
# ========
VERBOSE := env_var_or_default("VERBOSE", "0")
VERBOSITY := if VERBOSE == "1" { "-vvv" } else { "" }
XDEBUG_SESSION := env_var_or_default("XDEBUG_SESSION", "")

# ================
# = common tasks =
# ================
# Init environment (e.g. ENV="dev")
[group: 'common']
init ENV="dev":
    bin/init {{ENV}}

# ===================
# = container tasks =
# ===================

# enter php container
[group: 'php']
php-enter:
    docker compose exec -it php bash

# Execute command in php container (e.g. COMMAND="php -v")
[group: 'php']
php-exec COMMAND:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} {{COMMAND}} {{VERBOSITY}}"

# Install PHP dependencies
[group: 'php']
php-install:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} composer install {{VERBOSITY}}"

# Update PHP dependencies
[group: 'php']
php-update:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} composer update {{VERBOSITY}}"

# Normalize PHP composer.json and composer.lock
[group: 'php']
php-composer-normalize:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} composer normalize {{VERBOSITY}}"

# Clear PHP cache and logs
[group: 'php']
php-clear: php-clear-cache php-clear-logs

# Clear PHP cache
[group: 'php']
php-clear-cache:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/console {{VERBOSITY}} cache:clear && rm -rf var/cache/*"

# Clear PHP logs
[group: 'php']
php-clear-logs:
    docker compose exec -it php bash -c "rm -rf var/log/*"

# Check PHP
[group: 'php']
php-check:
	docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 {{VERBOSITY}} vendor/bin/rector process --dry-run"
	docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 {{VERBOSITY}} vendor/bin/php-cs-fixer check"
	docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 {{VERBOSITY}} vendor/bin/phpstan analyse"

# Check PHP security
[group: 'php']
php-check-security:
	docker compose exec -it php bash -c "composer audit"
	docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 {{VERBOSITY}} vendor/bin/security-checker security:check composer.lock"

# Fix PHP
[group: 'php']
php-fix:
	docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 {{VERBOSITY}} vendor/bin/rector process"
	docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 {{VERBOSITY}} vendor/bin/php-cs-fixer fix"

# Run all tests
[group: 'php']
php-test-all:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/phpunit {{VERBOSITY}} tests"

# Run unit tests
[group: 'php']
php-test-unit:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/phpunit {{VERBOSITY}} --testsuite unit"

# Run integration tests
[group: 'php']
php-test-integration:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/phpunit {{VERBOSITY}} --testsuite integration"

# Run single test (e.g. FILE="tests/AdminBundle/Services/PlatformImport/DynamicXmlTransformerTest.php --filter playroom")
[group: 'php']
php-test-single FILE:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/phpunit {{VERBOSITY}} {{FILE}}"

# Migrate database
[group: 'php']
php-doctrine-migrations-migrate:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/console {{VERBOSITY}} doctrine:migrations:migrate --no-interaction"

# Load fixtures
[group: 'php']
php-doctrine-fixtures-load:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} php -d memory_limit=-1 bin/console {{VERBOSITY}} doctrine:fixtures:load --append --no-interaction"

# Prepare database for given environment (e.g. ENV="test")
[group: 'php']
php-prepare-database ENV:
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} APP_ENV={{ENV}} php -d memory_limit=-1 bin/console {{VERBOSITY}} doctrine:database:drop --force --if-exists"
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} APP_ENV={{ENV}} php -d memory_limit=-1 bin/console {{VERBOSITY}} doctrine:database:create"
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} APP_ENV={{ENV}} php -d memory_limit=-1 bin/console {{VERBOSITY}} doctrine:migrations:migrate --no-interaction"
    docker compose exec -it php bash -c "XDEBUG_SESSION={{XDEBUG_SESSION}} APP_ENV={{ENV}} php -d memory_limit=-1 bin/console {{VERBOSITY}} doctrine:fixtures:load --append --no-interaction"

# ==============
# = node tasks =
# ==============

# Enter node container
[group: 'node']
node-enter:
    docker compose exec -it node bash

# Execute command in node container (e.g. COMMAND="node -v")
[group: 'node']
node-exec COMMAND:
    docker compose exec -it node bash -c "{{COMMAND}}"

# Install node dependencies
[group: 'node']
node-install:
    docker compose exec -it node bash -c "pnpm install"

# Update node dependencies
[group: 'node']
node-update:
    docker compose exec -it node bash -c "pnpm update"

# Run node in dev mode
[group: 'node']
node-run-dev:
    docker compose exec -it node bash -c "pnpm run dev"

# Build node in production mode
[group: 'node']
node-run-build:
    docker compose exec -it node bash -c "pnpm run build:app"
    docker compose exec -it node bash -c "pnpm run build:ssr"

# Serve node SSR application
[group: 'node']
node-run-ssr-serve:
    docker compose exec -it node bash -c "pnpm run ssr:serve"
