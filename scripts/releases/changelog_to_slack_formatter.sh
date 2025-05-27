#!/usr/bin/env bash
input=$(cat)

input=$(sed -E \
          -e 's/\[([^]]+)\]\(([^)]+)\)/<\2|\1>/g' \
          -e 's/^#{1,6}[[:space:]]*([^[:space:]].*)$/\*\1\*/' \
          -e 's/^- /• /' <<< "$input")

echo "$input"