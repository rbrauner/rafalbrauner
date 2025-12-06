#!/usr/bin/env bash

pnpm config set store-dir $PNPM_HOME/.pnpm-store
pnpm install
pnpm run build
rm -rf node_modules
