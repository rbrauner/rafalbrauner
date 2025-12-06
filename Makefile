# ========
# = vars =
# ========

# ================
# = common tasks =
# ================
# ex. ENV="dev"
init:
	ENV=$${ENV:-dev}; bin/init $$ENV

# ===================
# = container tasks =
# ===================
php-enter:
	docker compose exec -it php bash

# ex. COMMAND="php -v"
php-exec:
	docker compose exec -it php bash -c "$(COMMAND)"

php-composer-install:
	docker compose exec -it php bash -c "composer install"

php-composer-update:
	docker compose exec -it php bash -c "composer update"

php-composer-normalize:
	docker compose exec -it php bash -c "composer normalize"

php-clear: php-clear-cache php-clear-logs

php-clear-cache:
	docker compose exec -it php bash -c "php -d memory_limit=-1 bin/console cache:clear && rm -rf var/cache/*"

php-clear-logs:
	docker compose exec -it php bash -c "rm -rf var/log/*"

php-check:
	docker compose exec -it php bash -c "php -d memory_limit=-1 vendor/bin/rector process --dry-run"
	docker compose exec -it php bash -c "php -d memory_limit=-1 vendor/bin/php-cs-fixer check"
	docker compose exec -it php bash -c "php -d memory_limit=-1 vendor/bin/phpstan analyse"

php-check-security:
	docker compose exec -it php bash -c "composer audit"
	docker compose exec -it php bash -c "php -d memory_limit=-1 vendor/bin/security-checker security:check composer.lock"

php-fix:
	docker compose exec -it php bash -c "php -d memory_limit=-1 vendor/bin/rector process"
	docker compose exec -it php bash -c "php -d memory_limit=-1 vendor/bin/php-cs-fixer fix"

php-test-all:
	docker compose exec -it php bash -c "php -d memory_limit=-1 bin/phpunit tests"

php-test-unit:
	docker compose exec -it php bash -c "php -d memory_limit=-1 bin/phpunit --testsuite unit"

php-test-integration:
	docker compose exec -it php bash -c "php -d memory_limit=-1 bin/phpunit --testsuite integration"

# ex. FILE="tests/Other/SystemCheckTest.php --filter testSystemIsWorking"
php-test-single:
	docker compose exec -it php bash -c "php -d memory_limit=-1 bin/phpunit $(FILE)"

php-doctrine-migrations-migrate:
	docker compose exec -it php bash -c "php -d memory_limit=-1 bin/console doctrine:migrations:migrate --no-interaction"

# ex. ENV="test"
php-prepare-database:
	docker compose exec -it php bash -c "APP_ENV=$(ENV) php -d memory_limit=-1 bin/console doctrine:database:drop --force --if-exists"
	docker compose exec -it php bash -c "APP_ENV=$(ENV) php -d memory_limit=-1 bin/console doctrine:database:create --if-not-exists"
	docker compose exec -it php bash -c "APP_ENV=$(ENV) php -d memory_limit=-1 bin/console doctrine:migrations:migrate --no-interaction"
	docker compose exec -it php bash -c "APP_ENV=$(ENV) php -d memory_limit=-1 bin/console doctrine:fixtures:load --append --no-interaction"

# ===========
# = include =
# ===========
-include Makefile.local.mk
