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

  local source_map_file=$(generate_sourcemaps | tail -n 1)

  local js_project_dir="$PROJECT_DIR/.."
  local instabug_dir=$(dirname $(node -p "require.resolve('instabug-reactnative/package.json')"))
  local inferred_token=$(cd $js_project_dir && source $instabug_dir/scripts/find-token.sh)
  local app_token=$(resolve_var "App Token" "INSTABUG_APP_TOKEN" "$inferred_token" | tail -n 1)

  local inferred_name=$(/usr/libexec/PlistBuddy -c 'print CFBundleShortVersionString' "$PROJECT_DIR/$INFOPLIST_FILE")
  local version_name=$(resolve_var "Version Name" "INSTABUG_APP_VERSION_NAME" "$inferred_name" | tail -n 1)

  local inferred_code=$(/usr/libexec/PlistBuddy -c 'print CFBundleVersion' "$PROJECT_DIR/$INFOPLIST_FILE")
  local version_code=$(resolve_var "Version Code" "INSTABUG_APP_VERSION_CODE" "$inferred_code" | tail -n 1)

  npx instabug upload-sourcemaps \
      --platform ios \
      --file $source_map_file \
      --token $app_token \
      --name $version_name \
      --code $version_code
}

generate_sourcemaps() {
  local react_native_dir=$(dirname $(node -p "require.resolve('react-native/package.json')"))

  # Fixes an issue with react-native prior to v0.67.0
  # For more info: https://github.com/facebook/react-native/issues/32168
  export RN_DIR=$react_native_dir 

  # Used withing `react-native-xcode.sh` to generate sourcemap file
  export SOURCEMAP_FILE="$(pwd)/main.jsbundle.map";

  source "$react_native_dir/scripts/react-native-xcode.sh"

  if [[ ! -f "$SOURCEMAP_FILE" ]]; then
    echo "[Error] Unable to find source map file at: $SOURCEMAP_FILE"
    exit 1
  fi

  echo $SOURCEMAP_FILE
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
