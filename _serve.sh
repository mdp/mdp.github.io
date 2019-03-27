#!/bin/bash

export PORT=${PORT:-4000}
export JEKYLL_VERSION=3.8
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  -p $PORT:$PORT \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  jekyll serve -p $PORT
