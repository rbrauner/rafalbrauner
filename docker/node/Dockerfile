FROM node:lts-alpine AS base

FROM base AS packages
RUN apk update
RUN apk upgrade
RUN apk add bash tzdata git vim findutils
RUN apk cache clean

FROM packages AS pnpm
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p $PNPM_HOME
RUN pnpm config set store-dir $PNPM_HOME/.pnpm-store

FROM pnpm AS environments
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
RUN chown -R $UID:$GID $PNPM_HOME

FROM configs AS dev

FROM configs AS prod
