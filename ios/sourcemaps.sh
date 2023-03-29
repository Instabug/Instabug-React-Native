#!/bin/sh

main() {
  if [[ "$INSTABUG_SOURCEMAPS_UPLOAD_DISABLE" = true ]]; then
    echo "[Info] \`INSTABUG_SOURCEMAPS_UPLOAD_DISABLE\` was set to true, skipping sourcemaps upload..."
    exit 0
  fi

  if [[ -z "$INFOPLIST_FILE" ]] || [[ -z "$PROJECT_DIR" ]]; then
    echo "[Error] Instabug sourcemaps script must be invoked by Xcode"
    exit 1
  fi

  generate_sourcemaps

  JS_PROJECT_DIR="$PROJECT_DIR/.."
  INSTABUG_DIR=$(dirname $(node -p "require.resolve('instabug-reactnative/package.json')"))
  INFERRED_TOKEN=$(cd $JS_PROJECT_DIR && source $INSTABUG_DIR/scripts/find-token.sh)
  APP_TOKEN=$(resolve_var "App Token" "INSTABUG_APP_TOKEN" "$INFERRED_TOKEN" | tail -n 1)

  INFERRED_NAME=$(/usr/libexec/PlistBuddy -c 'print CFBundleShortVersionString' "$PROJECT_DIR/$INFOPLIST_FILE")
  VERSION_NAME=$(resolve_var "Version Name" "INSTABUG_APP_VERSION_NAME" "$INFERRED_NAME" | tail -n 1)

  INFERRED_CODE=$(/usr/libexec/PlistBuddy -c 'print CFBundleVersion' "$PROJECT_DIR/$INFOPLIST_FILE")
  VERSION_CODE=$(resolve_var "Version Code" "INSTABUG_APP_VERSION_CODE" "$INFERRED_CODE" | tail -n 1)

  npx instabug upload-sourcemaps \
      --platform ios \
      --file $SOURCEMAP_FILE \
      --token $APP_TOKEN \
      --name $VERSION_NAME \
      --code $VERSION_CODE
}

generate_sourcemaps() {
  REACT_NATIVE_DIR=$(dirname $(node -p "require.resolve('react-native/package.json')"))

  # Fixes an issue with react-native prior to v0.67.0
  # For more info: https://github.com/facebook/react-native/issues/32168
  export RN_DIR=$REACT_NATIVE_DIR 

  # Used withing `react-native-xcode.sh` to generate sourcemap file
  export SOURCEMAP_FILE="$(pwd)/main.jsbundle.map";

  source "$REACT_NATIVE_DIR/scripts/react-native-xcode.sh"

  if ![[ -f "$SOURCEMAP_FILE" ]]; then
    echo "[Error] Unable to find source map file at: $SOURCEMAP_FILE"
    exit 1
  fi
}

resolve_var() {
  local name=$1
  local env_key=$2
  local default_value=$3

  local env_value="${!env_key}"

  if [[ -n "$env_value" ]] && [[ "$env_value" != default_value ]]; then
    echo "[Warning] Environment variable \`$env_key\` might have incorrect value, make sure this was intentional:"
    echo "   Environment Value: $env_value"
    echo "   Default Value: $default_value"
  fi

  local value="${env_value:-$default_value}"

  if [[ -z "$value" ]]; then
    echo "[Error] Unable to find $name! Set the environment variable \`$env_key\` and try again."
    exit 1
  fi

  echo $value
}

main "$@"; exit
