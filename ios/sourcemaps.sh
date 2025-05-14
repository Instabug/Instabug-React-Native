#!/bin/bash

set -x -e

export SOURCEMAP_FILE="$DERIVED_FILE_DIR/main.jsbundle.map"

main() {
  local env_path="$PODS_ROOT/../.xcode.env"
  local local_env_path="${env_path}.local"

  # Load environment variables if available
  [ -f "$env_path" ] && source "$env_path"
  [ -f "$local_env_path" ] && source "$local_env_path"

  if [[ "${INSTABUG_SOURCEMAPS_UPLOAD_DISABLE:-false}" == "true" ]]; then
    echo "[Info] INSTABUG_SOURCEMAPS_UPLOAD_DISABLE is true, skipping sourcemaps upload..." >&2
    exit 0
  fi

  if [[ "${CONFIGURATION:-}" == "Debug" ]]; then
    echo "[Info] Debug build detected, skipping sourcemaps upload..." >&2
    exit 0
  fi

  if [[ -z "${INFOPLIST_FILE:-}" || -z "${PROJECT_DIR:-}" ]]; then
    echo "[Error] This script must be run from within Xcode" >&2
    exit 1
  fi

  local js_project_dir="$PROJECT_DIR/.."
  local sourcemap_file=""

  # Use existing sourcemap if available
  if [[ -f "$SOURCEMAP_FILE" ]]; then
    sourcemap_file="$SOURCEMAP_FILE"
  else
    if node -p "require.resolve('expo/package.json')" >/dev/null 2>&1; then
      echo "[Info] Detected Expo project" >&2
      sourcemap_file=$(generate_sourcemaps "$(dirname "$(node -p "require.resolve('expo/package.json')")")")
    else
      echo "[Info] Detected standard React Native project" >&2
      sourcemap_file=$(generate_sourcemaps "$(dirname "$(node -p "require.resolve('react-native/package.json')")")")
    fi
  fi

  if [[ ! -f "$sourcemap_file" ]]; then
    echo "[Error] Source map file not found at: $sourcemap_file" >&2
    exit 1
  fi

  echo "[Info] Using sourcemap: $sourcemap_file"

  local instabug_dir=$(dirname "$(node -p "require.resolve('instabug-reactnative/package.json')")")

find_token_script="$instabug_dir/scripts/find-token.sh"
if [ ! -x "$find_token_script" ]; then
  echo "[Info] Making find-token.sh executable"
  chmod u+x "$find_token_script" || {
    echo "[Error] Failed to chmod find-token.sh" >&2
    exit 1
  }
fi

  local inferred_token=$(cd "$js_project_dir" && source $instabug_dir/scripts/find-token.sh)

  local app_token=$(resolve_var "App Token" "INSTABUG_APP_TOKEN" "$inferred_token" | tail -n 1)

  local inferred_name=$(/usr/libexec/PlistBuddy -c 'print CFBundleShortVersionString' "$PROJECT_DIR/$INFOPLIST_FILE")
  local version_name=$(resolve_var "Version Name" "INSTABUG_APP_VERSION_NAME" "$inferred_name")

  local inferred_code=$(/usr/libexec/PlistBuddy -c 'print CFBundleVersion' "$PROJECT_DIR/$INFOPLIST_FILE")
  local version_code=$(resolve_var "Version Code" "INSTABUG_APP_VERSION_CODE" "$inferred_code")

  echo "[Info] Uploading sourcemap to Instabug..." >&2
  node "$instabug_dir/bin/index.js" upload-sourcemaps \
    --platform ios \
    --file "$sourcemap_file" \
    --token "$app_token" \
    --name "$version_name" \
    --code "$version_code"
}

generate_sourcemaps() {
  local base_dir="$1"

  export RN_DIR="$base_dir"
  export SOURCEMAP_FILE="$(pwd)/main.jsbundle.map"

  source "$base_dir/scripts/react-native-xcode.sh"

  if [[ ! -f "$SOURCEMAP_FILE" ]]; then
    echo "[Error] Failed to generate sourcemap at: $SOURCEMAP_FILE" >&2
    exit 1
  fi

  echo "$SOURCEMAP_FILE"
}

resolve_var() {
  local name="$1"
  local env_key="$2"
  local default_value="$3"

  local value="${!env_key:-$default_value}"

  if [[ -n "${!env_key:-}" && "${!env_key}" != "$default_value" ]]; then
    echo "[Warning] $env_key may be misconfigured. Check values below:" >&2
    echo "  Env:      ${!env_key}" >&2
    echo "  Fallback: $default_value" >&2
  fi

  if [[ -z "$value" ]]; then
    echo "[Error] Could not resolve $name. Set \`$env_key\` in your environment." >&2
    exit 1
  fi

  echo "$value"
}

main "$@"
