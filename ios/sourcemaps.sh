#!/bin/sh

if [[ "$INSTABUG_SOURCEMAPS_UPLOAD_DISABLE" = true ]]; then
  echo 'Instabug: `INSTABUG_SOURCEMAPS_UPLOAD_DISABLE` was set to true, skipping sourcemap upload'
  exit 0
fi

if [[ -z "$INFOPLIST_FILE" ]] || [[ -z "$PROJECT_DIR" ]]; then
  echo '[Instabug] Sourcemaps script must be invoked by Xcode'
  exit 1
fi


## Generate Sourcemap ##

REACT_NATIVE_DIR=$(dirname $(node -p "require.resolve('react-native/package.json')"))

# Fixes an issue with react-native prior to v0.67.0
# For more info: https://github.com/facebook/react-native/issues/32168
export RN_DIR=$REACT_NATIVE_DIR 

# Used withing `react-native-xcode.sh` to generate sourcemap file
export SOURCEMAP_FILE="$(pwd)/main.jsbundle.map";

source "$REACT_NATIVE_DIR/scripts/react-native-xcode.sh"

if ![[ -f "$SOURCEMAP_FILE" ]]; then
  echo "Unable to find source map file at: $SOURCEMAP_FILE"
fi


## App Token ##

JS_PROJECT_DIR="$PROJECT_DIR/.."
INSTABUG_DIR=$(dirname $(node -p "require.resolve('instabug-reactnative/package.json')"))
INFERRED_TOKEN=$(cd $JS_PROJECT_DIR && source $INSTABUG_DIR/scripts/find-token.sh)
APP_TOKEN="${INSTABUG_APP_TOKEN:-$INFERRED_TOKEN}"

if [[ -z "$APP_TOKEN" ]]; then
  echo '[Instabug] Failed to find Instabug App Token! Set the enviroment variable `INSTABUG_APP_TOKEN`, to enable automatic sourcemap file uploads'
  exit 1
fi


## Version Code ##

INFERRED_VERSION_CODE=$(/usr/libexec/PlistBuddy -c 'print CFBundleVersion' "$PROJECT_DIR/$INFOPLIST_FILE")
VERSION_CODE="${INSTABUG_APP_VERSION_CODE:-$INFERRED_VERSION_CODE}"

if [[ -z "$VERSION_CODE" ]]; then
  echo '[Instabug] Failed to find Version Code! Set the enviroment variable `INSTABUG_APP_VERSION_CODE`, to enable automatic sourcemap file uploads'
  exit 1
fi


## Version Name ##

INFERRED_VERSION_NAME=$(/usr/libexec/PlistBuddy -c 'print CFBundleShortVersionString' "$PROJECT_DIR/$INFOPLIST_FILE")
VERSION_NAME="${INSTABUG_APP_VERSION_NAME:-$INFERRED_VERSION_NAME}"

if [[ -z "$VERSION_NAME" ]]; then
  echo '[Instabug] Failed to find Version Name! Set the enviroment variable `INSTABUG_APP_VERSION_NAME`, to enable automatic sourcemap file uploads'
  exit 1
fi


## Upload Sourcemap ##

npx instabug upload-sourcemaps \
    --platform ios \
    --file $SOURCEMAP_FILE \
    --token $APP_TOKEN \
    --name $VERSION_NAME \
    --code $VERSION_CODE
