#!/bin/bash
# from https://gist.github.com/Igor1201/5036401727a9c178193b1e0688e1eb3c
set -eo pipefail

export ANDROID_HOME="/usr/local/share/android-sdk"
export PATH="$PATH:$ANDROID_HOME/tools/bin"

# set variables
ANDROID_SDK_URL="https://dl.google.com/android/repository/sdk-tools-darwin-3859397.zip"
ANDROID_SDK_SHA="4a81754a760fce88cba74d69c364b05b31c53d57b26f9f82355c61d5fe4b9df9"
TMP_DIR=$(mktemp -d)

# clean
rm -rf "$ANDROID_HOME"

# download and install sdk
cd "$TMP_DIR"
curl "$ANDROID_SDK_URL" > "sdk.zip"
echo "$ANDROID_SDK_SHA *sdk.zip" | shasum -c -s -a 256 -
unzip "sdk.zip" -d "$ANDROID_HOME"

# sdkmanager configuration
mkdir -p "$HOME/.android"
echo "count=0" > "$HOME/.android/repositories.cfg"

# install what you need
echo y | sdkmanager "platforms;android-25"
echo y | sdkmanager "build-tools;25.0.3"
echo y | sdkmanager "extras;android;m2repository"
echo y | sdkmanager "extras;google;m2repository"