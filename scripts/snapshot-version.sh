#!/bin/bash

# Generates a snapshot version following the format {version}-{pr}{random-3-digit}-SNAPSHOT
# Example: 13.3.0-502861-SNAPSHOT

pr=$(basename $CIRCLE_PULL_REQUEST)
random=$(($RANDOM % 900 + 100))
version=$(jq -r '.version' package.json)
suffix="SNAPSHOT"

SNAPSHOT_VERSION="$version-$pr$random-$suffix"
