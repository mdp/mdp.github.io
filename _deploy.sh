#!/bin/bash

jekyll build
s3cmd sync --delete-removed _site/ s3://www.markpercival.us
