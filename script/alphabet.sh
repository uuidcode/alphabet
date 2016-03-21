#!/usr/bin/env bash
function createAlphabet() {
label=${1}
font=${2}
fontSize=${3}

convert -background none -fill DodgerBlue \
      -font ${font} -pointsize ${fontSize}  label:${label} -trim +repage \
      -bordercolor None -border 10x10 \
      \
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

imagePath=../src/main/webapp/images

for i in {A..Z}
do
    createAlphabet ${i} Chalkboard 200
done
