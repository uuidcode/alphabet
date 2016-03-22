#!/usr/bin/env bash
font=Impact
size=100x150
imagePath=../src/main/webapp/images

function createAlphabet() {
label=${1}

convert -background none -fill DodgerBlue \
      -size ${size} \
      -gravity center \
      -font ${font} \
      label:${label} \
      -bordercolor None \
      \( +clone -bordercolor None -border 1x1 \
         -alpha Extract -blur 0x8  -shade 130x30 -alpha On \
         -background gray50 -alpha background -auto-level \
         -function polynomial  3.5,-5.05,2.05,0.3 \
         \( +clone -alpha extract  -blur 0x2 \) \
         -channel RGB -compose multiply -composite \
         +channel +compose -chop 1x1 \
      \) \
      -compose Hardlight -composite  ${imagePath}/${label}.png
}

for i in {A..Z}
do
    createAlphabet ${i}
done
