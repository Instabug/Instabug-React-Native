#!/bin/sh

main() 
{
  # export NODE_BINARY=$(which node)
  PROJECT_DIR=$(cd "$PROJECT_DIR" && pwd)
  echo "[Info] Project directory: $PROJECT_DIR"
  echo "[Info] PWD is: $(pwd)"
  echo "[Info] build platform is: $BUILD_PLATFORM"
  export ENTRY_FILE="$PROJECT_DIR/node_modules/$entryPoint";
  echo "[Info] Entry file: $ENTRY_FILE"

   npx expo export:embed \
  --entry-file $ENTRY_FILE \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output main.jsbundle \
  --sourcemap-output main.jsbundle.map \
  --minify false

  echo "[Info] Exported sourcemaps to $PROJECT_DIR/main.jsbundle.map"
  

   node $PROJECT_DIR/node_modules/instabug-reactnative/bin/index.js upload-sourcemaps \
      --platform ios \
      --file $PROJECT_DIR/main.jsbundle.map \
      --token $APPLICATION_TOKEN \
      --name $APP_VERSION \
      --code $VERSION_CODE
  
  echo "[Info] Uploaded sourcemaps to Instabug"
}


main "$@"; exit 