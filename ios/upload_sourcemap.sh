    cd  "${SRCROOT}"
    cd ..
    #Generate ios sourcemap
    react-native bundle --platform ios \
    --entry-file index.js \
    --dev false \
    --bundle-output ./ios/main.jsbundle \
    --sourcemap-output ./ios-sourcemap.json &&
    zip ./ios-sourcemap.zip ./ios-sourcemap.json
    echo "Instabug: Looking for Token..."
    if [ ! "${APP_TOKEN}" ]; then
    APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} 'Instabug.startWithToken(\"[0-9a-zA-Z]*\"' ./ -m 1 | grep -o '\"[0-9a-zA-Z]*\"' | cut -d "\"" -f 2)
    fi

    if [ ! "${APP_TOKEN}" ] || [ -z "${APP_TOKEN}" ];then
    echo "Instabug: err: APP_TOKEN not found. Make sure you've added the SDK initialization line Instabug.startWithToken"
    exit 1
    else
    echo "Instabug: Uploading files..."
    #Upload ios sourcemap
    curl --data "file=ios-sourcemap.json&platform=react_native&os=ios&application_token=${APP_TOKEN}" https://api.instabug.com/api/sdk/v3/symbols_files
    echo 
    fi

