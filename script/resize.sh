#!/usr/bin/env bash
path=../src/main/webapp/images
image=${1}

convert ${path}/${image}.png -resize 350x350 ${path}/${image}.png