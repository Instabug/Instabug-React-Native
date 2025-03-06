sdk_version=$(grep -i 'version' pubspec.yaml) #version: xx.x.x+x
sdk_version=$(cut -f2 -d' ' <<<  "$sdk_version") #xx.x.x+x
sdk_version=$(cut -f1 -d'+' <<< "$sdk_version") #xx.x.x

echo "$sdk_version"