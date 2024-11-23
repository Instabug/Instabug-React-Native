#!/bin/bash

# Replaces the internal Config.plist file inside the Instabug iOS SDK with the
# Instabug.plist file in the example app.
#
# This is a workaround until the iOS SDK is updated to prioritize the custom
# Instabug.plist over the internal Config.plist.

instabug_plist=examples/default/ios/InstabugExample/Instabug.plist

if [ ! -f $instabug_plist ]; then
  echo "Instabug.plist not found"
  exit 1
fi

for dir in examples/default/ios/Pods/Instabug/Instabug.xcframework/ios-*/
do
  echo "Replacing Config.plist in $dir"

  config_path=$dir/Instabug.framework/InstabugResources.bundle/Config.plist

  if [ ! -f $config_path ]; then
    echo "Config.plist not found in $dir"
    exit 1
  fi

  cp -f $instabug_plist $config_path
done
