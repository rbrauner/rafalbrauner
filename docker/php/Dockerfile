FROM php:8.4-fpm-alpine AS base

FROM base AS packages
RUN apk update
RUN apk upgrade
RUN apk add bash tzdata git vim findutils
RUN apk cache clean

FROM packages AS extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions opcache
RUN install-php-extensions pgsql
RUN install-php-extensions pdo_pgsql
RUN install-php-extensions @composer

FROM extensions AS environments
# args and envs
ARG TZ="Europe/Warsaw"
ARG USER="app"
ARG GROUP="app"
ARG UID=1000
ARG GID=1000
ENV TZ=${TZ}

FROM environments AS configs
# working directory
WORKDIR /var/www/html
# timezone and localtime
RUN echo $TZ > /etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime
# make sure `/var/www/html` exists
RUN mkdir -p /var/www/html
# make `/var/www/html` safe for git operations
RUN git config --global --add safe.directory /var/www/html
# create user and group for app
RUN addgroup -g $GID -S $USER
RUN adduser -u $UID -D -S -G $GROUP $USER

FROM configs AS dev
RUN install-php-extensions xdebug
COPY ./docker/php/dev/php.ini $PHP_INI_DIR/php.ini

FROM configs AS prod
COPY ./docker/php/prod/php.ini $PHP_INI_DIR/php.ini
