#!/bin/bash


npm run build:prod
source scripts/build.sh
source scripts/push_image.sh lego-block-web:latest
