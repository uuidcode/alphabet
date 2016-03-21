#!/usr/bin/env bash
function createAlphabet() {
convert \
    -background none \
    -fill DodgerBlue \
    -font ComicSansMSB \
    -pointsize 200 \
    label:${1}  \
    -trim +repage  \
    -bordercolor None -border 1x1  \
    ../src/main/webapp/images/${1}.png
}

for i in {A..Z}
do
    createAlphabet ${i}
done
