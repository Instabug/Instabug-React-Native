#!/bin/sh
cd ..
cd ..
cd ..
#Generate android sourcemap
react-native bundle --platform android \
--entry-file index.js \
--dev false \
--bundle-output ./android/main.jsbundle \
--sourcemap-output ./android-sourcemap.json &&
zip ./android-sourcemap.zip ./android-sourcemap.json

echo "Instabug: Looking for Token..."
if [ ! "${APP_TOKEN}" ]; then
APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} 'Instabug.startWithToken(\"[0-9a-zA-Z]*\"' ./ -m 1 | grep -o '\"[0-9a-zA-Z]*\"' | cut -d "\"" -f 2)
fi

if [ ! "${APP_TOKEN}" ]; then
APP_TOKEN=$(grep -r --exclude-dir={node_modules,ios,android} "Instabug.startWithToken(\'[0-9a-zA-Z]*\'" ./ -m 1 | grep -o "\'[0-9a-zA-Z]*\'" | cut -d "\"" -f 2)
fi

if [ ! "${APP_TOKEN}" ] || [ -z "${APP_TOKEN}" ];then
echo "Instabug: err: APP_TOKEN not found. Make sure you've added the SDK initialization line Instabug.startWithToken"
exit 1
else
echo "Instabug: Uploading files..."
#Upload android sourcemap
curl -X POST 'https://api.instabug.com/api/sdk/v3/symbols_files'  -F "symbols_file=@./android-sourcemap.json"  -F "application_token=${APP_TOKEN}"  -F "platform=react_native"  -F "os=android" 

echo 
fi
