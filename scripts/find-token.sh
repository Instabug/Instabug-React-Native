#!/bin/sh

# Searches for app token within source files.

INIT_APP_TOKEN=$(
    grep "Instabug.init({" -r -A 6 -m 1 --exclude-dir={node_modules,ios,android} --include=\*.{js,ts,jsx,tsx} ./ |
    grep "token:[[:space:]]*[\"\'][0-9a-zA-Z]*[\"\']" |
    grep -o "[\"\'][0-9a-zA-Z]*[\"\']" |
    cut -d "\"" -f 2 |
    cut -d "'" -f 2
) 

if [ ! -z "${INIT_APP_TOKEN}" ]; then
    echo $INIT_APP_TOKEN
    exit 0
fi

START_APP_TOKEN=$(
    grep "Instabug.start(" -r -A 1 -m 1 --exclude-dir={node_modules,ios,android} --include=\*.{js,ts,jsx,tsx} ./ |
    grep -o "[\"\'][0-9a-zA-Z]*[\"\']" |
    cut -d "\"" -f 2 |
    cut -d "'" -f 2
) 

if [ ! -z "${START_APP_TOKEN}" ]; then
    echo $START_APP_TOKEN
    exit 0
fi

echo "Couldn't find Instabug's app token"
exit 1
