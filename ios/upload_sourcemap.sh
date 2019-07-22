 #!/bin/bash
cd  "${SRCROOT}"
cd ..
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
. "$HOME/.nvm/nvm.sh"
elif [[ -x "$(command -v brew)" && -s "$(brew --prefix nvm)/nvm.sh" ]]; then
. "$(brew --prefix nvm)/nvm.sh"
fi
export NODE_BINARY=node
#Generate ios sourcemap
react-native bundle --platform ios \
--entry-file index.js \
--dev false \
--bundle-output ./ios/main.jsbundle \
--sourcemap-output ./ios-sourcemap.json &&
zip ./ios-sourcemap.zip ./ios-sourcemap.json

if [ ${INSTABUG_APP_TOKEN} == "YOUR_APP_TOKEN" ]; then
    echo "Instabug: Looking for Token..."
    if [ ! "${INSTABUG_APP_TOKEN}" ]; then
        INSTABUG_APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} 'Instabug.startWithToken(\"[0-9a-zA-Z]*\"' ./ -m 1 | grep -o '\"[0-9a-zA-Z]*\"' | cut -d "\"" -f 2)
    fi

    if [ ! "${INSTABUG_APP_TOKEN}" ]; then
        INSTABUG_APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} "Instabug.startWithToken(\'[0-9a-zA-Z]*\'" ./ -m 1 | grep -o "\'[0-9a-zA-Z]*\'" | cut -d "\"" -f 2)
    fi
fi


if [ ! "${INSTABUG_APP_TOKEN}" ] || [ -z "${INSTABUG_APP_TOKEN}" ] || [ "${INSTABUG_APP_TOKEN}" == "YOUR_APP_TOKEN" ];then
    echo "Instabug: err: INSTABUG_APP_TOKEN not found. Make sure you've added the SDK initialization line Instabug.startWithToken Or added it to the environment variable in the gradle"
    exit 0
else
    echo "Instabug: Uploading files..."
    #Upload ios sourcemap
    curl -X POST 'https://api.instabug.com/api/sdk/v3/symbols_files'  -F "symbols_file=@./ios-sourcemap.json"  -F "application_token=${INSTABUG_APP_TOKEN}"  -F "platform=react_native"  -F "os=ios" 
    echo 
fi
