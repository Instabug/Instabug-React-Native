#!/bin/bash

# This script is responsible for bumping up the version of instabug-reactnative and its sub-packages.
# It makes sure that the peer dependencies of the sub-packages point to the correct version of the
# instabug-reactnative package.

subpackages=("ndk")
version=$1

if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed. Install it using brew:' >&2
  echo '$ brew install jq' >&2
  exit 1
fi

if [ -z "$version" ]; then
    echo "Error: Please provide a version number" >&2
    exit 1
fi

echo "Bumping instabug-reactnative to $version"

cd core
npm version $version --no-git-tag-version --allow-same-version
cd ..

for subpackage in "${subpackages[@]}"; do
    cd $subpackage

    echo "Bumping $subpackage to $version"
    npm version $version --no-git-tag-version --allow-same-version

    echo "Bumping $subpackage's peer dependency to $version"

    tmp=$(mktemp)
    jq ".peerDependencies.\"instabug-reactnative\" = \"$version\"" package.json > "$tmp" && mv "$tmp" package.json

    cd ..
done
