#!/bin/sh

# `&` is used to run the process in the background
pnpm serve apps/storybook/storybook-static --listen 6006 &
pnpm workspace storybook cypress run "$@"
