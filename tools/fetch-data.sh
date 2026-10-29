#!/bin/bash
# Downloads the open data and libraries AG LAB needs into .cache/ and vendors
# the libraries into site/lab/vendor/. Re-run to refresh.
#   GeoNames (CC BY 4.0): cities, admin names, Chinese alternate names
#   lunar-javascript (MIT), @photostructure/tz-lookup (CC0), qrcode-generator (MIT)
#   opencc-js (MIT/Apache-2.0): build time only, traditional → simplified city names
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .cache/alt site/lab/vendor site/lab/data

G=https://download.geonames.org/export/dump
curl -fsSL -o .cache/cities15000.zip "$G/cities15000.zip"
curl -fsSL -o .cache/admin1CodesASCII.txt "$G/admin1CodesASCII.txt"
curl -fsSL -o .cache/countryInfo.txt "$G/countryInfo.txt"
for c in CN HK MO TW; do curl -fsSL -o ".cache/alt/$c.zip" "$G/alternatenames/$c.zip"; done
mkdir -p .cache/gaz && curl -fsSL -o .cache/gaz/CN.zip "$G/CN.zip"
(cd .cache && unzip -o -q cities15000.zip)
(cd .cache/gaz && unzip -o -q CN.zip)
(cd .cache/alt && for c in CN HK MO TW; do unzip -o -q "$c.zip"; done)

cd .cache
rm -rf pkg && mkdir pkg && cd pkg
npm pack --silent lunar-javascript@1.7.7 @photostructure/tz-lookup@11.7.0 qrcode-generator@2.0.4 opencc-js@1.4.2 >/dev/null
for t in *.tgz; do d="${t%.tgz}"; mkdir -p "$d"; tar -xzf "$t" -C "$d"; done
cd ../..
echo "downloaded; now run: node tools/build-cities.js && node tools/vendor.js"
