#!/usr/bin/env bash

pnpm config set store-dir $PNPM_HOME/.pnpm-store
pnpm install
pnpm run build:app
pnpm run build:ssr
rm -rf node_modules
pnpm run ssr:serve
