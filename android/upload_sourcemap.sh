#!/bin/sh
USER_ANDROID_DIR=$1
cd "${USER_ANDROID_DIR}/.."

if [ -s "$HOME/.nvm/nvm.sh" ]; then
. "$HOME/.nvm/nvm.sh"
elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
. "$(brew --prefix nvm)/nvm.sh"
fi
export NODE_BINARY=node

if [ ! "${INSTABUG_APP_TOKEN}" ] || [ -z "${INSTABUG_APP_TOKEN}" ]; then
    echo "Instabug: Looking for Token..."
    INSTABUG_APP_TOKEN=$(grep -r -A 6  --exclude-dir={node_modules,ios,android} --exclude='*.json' "Instabug.init({" ./ -m1 | grep "token:[[:space:]]*[\"\'][0-9a-zA-Z]*[\"\']" | grep -o "[\"\'][0-9a-zA-Z]*[\"\']" | cut -d "\"" -f 2 | cut -d "'" -f 2)
    if [ -z "${INSTABUG_APP_TOKEN}" ]; then
    INSTABUG_APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} --exclude='*.json' "Instabug.start[WithToken]*([\"\'][0-9a-zA-Z]*[\"\']" ./ -m 1 | grep -o "[\"\'][0-9a-zA-Z]*[\"\']" | cut -d "\"" -f 2 | cut -d "'" -f 2)
    fi
fi

if [ ! "${INSTABUG_APP_TOKEN}" ] || [ -z "${INSTABUG_APP_TOKEN}" ]; then
    echo "Instabug: err: INSTABUG_APP_TOKEN not found. Make sure you've added the SDK initialization line Instabug.init Or added the environment variable INSTABUG_APP_TOKEN"
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
    if [ -z "${INSTABUG_ENTRY_FILE}" ]; then 
        ENTRY_FILE='index.js'
    else 
        ENTRY_FILE=${INSTABUG_ENTRY_FILE}
    fi
    if [ ! -f $ENTRY_FILE ]; then
        echo "Instabug: err: entry file not found. Make sure" "\"${ENTRY_FILE}\"" "exists in your projects root directory. Or add the environment variable INSTABUG_ENTRY_FILE with the name of your entry file"
        exit 0
    fi
    VERSION='{"code":"'"$INSTABUG_APP_VERSION_CODE"'","name":"'"$INSTABUG_APP_VERSION_NAME"'"}'
    echo "Instabug: Token found" "\""${INSTABUG_APP_TOKEN}"\""
    echo "Instabug: Version Code found" "\""${INSTABUG_APP_VERSION_CODE}"\""
    echo "Instabug: Version Name found" "\""${INSTABUG_APP_VERSION_NAME}"\""
    echo "Instabug: Entry file found" "\""${ENTRY_FILE}"\""
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

        # Find hermes(c) binary file path
        RN_VERSION=$(node -p "require('react-native/package.json').version")
        RN_VERSION_MINOR=$(echo $RN_VERSION | cut -d "." -f2)
        echo "Instabug: Using React Native v$RN_VERSION"

        if [ "$RN_VERSION_MINOR" -ge 69 ]; then
            RN_PACKAGE_PATH=$(node -p "require.resolve('react-native/package.json')")
            RN_PATH=${RN_PACKAGE_PATH%"/package.json"}
            HERMES_PATH=$RN_PATH/sdks/hermesc/$HERMES_OS_BIN/hermesc
        else
            HERMES_ENGINE_PACKAGE_PATH=$(node -p "require.resolve('hermes-engine/package.json')")
            HERMES_ENGINE_PATH=${HERMES_ENGINE_PACKAGE_PATH%"/package.json"}
            if [ "$RN_VERSION_MINOR" -lt 63 ]; then
                HERMES_PATH=$HERMES_ENGINE_PATH/$HERMES_OS_BIN/hermes
            else
                HERMES_PATH=$HERMES_ENGINE_PATH/$HERMES_OS_BIN/hermesc
            fi
        fi
    
        if [ "$RN_VERSION_MINOR" -ge 65 ]
        then
            EXTRA_ARGS="--minify false"
        fi
        #Generate android sourcemap (HERMES)
        npx react-native bundle --platform android \
        --reset-cache \
        --entry-file $ENTRY_FILE \
        --dev false \
        --bundle-output index.android.bundle \
        --sourcemap-output index.android.bundle.packager.map \
        $EXTRA_ARGS

        echo "Instabug: Using Hermes from: $HERMES_PATH"
        $HERMES_PATH -emit-binary -out index.android.bundle.hbc index.android.bundle -O -output-source-map > /dev/null 2>&1

        cp index.android.bundle.hbc.map index.android.bundle.compiler.map

        COMPOSE_SCRIPT_PATH=$(node -p "require.resolve('react-native/scripts/compose-source-maps.js')")
        node $COMPOSE_SCRIPT_PATH index.android.bundle.packager.map index.android.bundle.compiler.map -o android-sourcemap.json
        rm -rf index.android.bundle
        rm -rf index.android.bundle.hbc.map
        rm -rf index.android.bundle.compiler.map
        rm -rf index.android.bundle.hbc 
        rm -rf index.android.bundle.packager.map
        rm -rf index.android.bundle.map
    else
        #Generate android sourcemap
        npx react-native bundle --platform android \
        --entry-file $ENTRY_FILE \
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
