#!/usr/bin/env bash

rm -rf ../jipy
mkdir ../jipy
cp -r background.js main.js manifest.json icon ../jipy/
rm ../firefox-jipy.zip
cd ../jipy
zip -r firefox-jipy.zip * 
mv firefox-jipy.zip ../firefox-jipy.zip
rm -rf ../jipy