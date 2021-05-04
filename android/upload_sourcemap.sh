#!/bin/sh
cd ..
cd ..
cd ..
if [ -s "$HOME/.nvm/nvm.sh" ]; then
. "$HOME/.nvm/nvm.sh"
elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
. "$(brew --prefix nvm)/nvm.sh"
fi
export NODE_BINARY=node

if [ ! "${INSTABUG_APP_TOKEN}" ] || [ -z "${INSTABUG_APP_TOKEN}" ]; then
    echo "Instabug: Looking for Token..."
    INSTABUG_APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} --exclude='*.json' "Instabug.start[WithToken]*([\"\'][0-9a-zA-Z]*[\"\']" ./ -m 1 | grep -o "[\"\'][0-9a-zA-Z]*[\"\']" | cut -d "\"" -f 2 | cut -d "'" -f 2)
fi

if [ ! "${INSTABUG_APP_TOKEN}" ] || [ -z "${INSTABUG_APP_TOKEN}" ]; then
    echo "Instabug: err: INSTABUG_APP_TOKEN not found. Make sure you've added the SDK initialization line Instabug.start Or added the environment variable INSTABUG_APP_TOKEN"
    exit 0
else
    if [ ! "${INSTABUG_APP_VERSION_CODE}" ] || [ -z "${INSTABUG_APP_VERSION_CODE}" ]; then
        INSTABUG_APP_VERSION_CODE=$(grep -o "versionCode\s\+\d\+" android/app/build.gradle -m 1 | awk '{ print $2 }')
        if [ ! "${INSTABUG_APP_VERSION_CODE}" ] || [ -z "${INSTABUG_APP_VERSION_CODE}" ]; then
            echo "versionCode could not be found, please upload the sourcemap files manually"
            exit 0
        fi
    fi
    if [ ! "${INSTABUG_APP_VERSION_NAME}" ] || [ -z "${INSTABUG_APP_VERSION_NAME}" ]; then
         INSTABUG_APP_VERSION_NAME=$(grep "versionName" android/app/build.gradle -m 1 | awk '{print $2}' | tr -d \''"\')
        if [ ! "${INSTABUG_APP_VERSION_NAME}" ] || [ -z "${INSTABUG_APP_VERSION_NAME}" ]; then
        echo "versionName could not be found, please upload the sourcemap files manually"
        exit 0
        fi
    fi
    VERSION='{"code":"'"$INSTABUG_APP_VERSION_CODE"'","name":"'"$INSTABUG_APP_VERSION_NAME"'"}'
    echo "Instabug: Token found" "\""${INSTABUG_APP_TOKEN}"\""
    echo "Instabug: Version Code found" "\""${INSTABUG_APP_VERSION_CODE}"\""
    echo "Instabug: Version Name found" "\""${INSTABUG_APP_VERSION_NAME}"\""
    echo "Instabug: Generating sourcemap files..."
    IS_HERMES=$(grep "enableHermes:" ./android/app/build.gradle -m 1)
    if [[ $IS_HERMES == *"true"* ]]; then
        #Find HERMES OS bin directory
        case "$OSTYPE" in
            darwin*)  HERMES_OS_BIN='osx-bin' ;; 
            linux*)   HERMES_OS_BIN='linux64-bin' ;;
            msys*)    HERMES_OS_BIN='win64-bin' ;;
            *)        echo "unknown: $OSTYPE" ;;
        esac

        #Find HERMES command file name
        INSTALLED_RN_VERSION_MAJOR=$(node -p "require('./node_modules/react-native/package.json').version" | cut -d "." -f2)
        if [ "$INSTALLED_RN_VERSION_MAJOR" -ge 63 ]
            then
                HERMES_COMMAND_NAME='hermesc'
            else
                HERMES_COMMAND_NAME='hermes'
        
        fi
        #Generate android sourcemap (HERMES)
        npx react-native bundle --platform android \
        --reset-cache \
        --entry-file index.js \
        --dev false \
        --bundle-output index.android.bundle \
        --sourcemap-output index.android.bundle.packager.map \

        node_modules/hermes-engine/$HERMES_OS_BIN/$HERMES_COMMAND_NAME -emit-binary -out index.android.bundle.hbc index.android.bundle -O -output-source-map > /dev/null 2>&1

        cp index.android.bundle.hbc.map index.android.bundle.compiler.map

        node node_modules/react-native/scripts/compose-source-maps.js index.android.bundle.packager.map index.android.bundle.compiler.map -o android-sourcemap.json
        rm -rf index.android.bundle
        rm -rf index.android.bundle.hbc.map
        rm -rf index.android.bundle.compiler.map
        rm -rf index.android.bundle.hbc 
        rm -rf index.android.bundle.packager.map
        rm -rf index.android.bundle.map
    else
        #Generate android sourcemap
        npx react-native bundle --platform android \
        --entry-file index.js \
        --dev false \
        --bundle-output ./android/main.jsbundle \
        --sourcemap-output ./android-sourcemap.json
    fi
    echo "Instabug: Uploading files..."
    #Upload android sourcemap
    curl -X POST 'https://api.instabug.com/api/sdk/v3/symbols_files' -F "app_version=${VERSION}"  -F "symbols_file=@./android-sourcemap.json"  -F "application_token=${INSTABUG_APP_TOKEN}"  -F "platform=react_native"  -F "os=android"
    rm -rf android-sourcemap.json
    echo 
fi
