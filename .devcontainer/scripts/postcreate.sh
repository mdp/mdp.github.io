#!/bin/bash

wget https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_0.121.1_linux-amd64.tar.gz
mkdir tmp
tar -xvf hugo_0.121.1_linux-amd64.tar.gz -C tmp 
sudo mv tmp/hugo /usr/local/bin/hugo
rm -rf tmp