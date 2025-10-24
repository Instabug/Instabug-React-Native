#!/usr/bin/env bash
latest_release=""
capturing=false

while IFS= read -r line; do
  if [[ "$line" == "## ["* ]]; then
      if $capturing; then
        break
      fi
  fi

  if [[ "$line" == "### "* ]]; then
    capturing=true
  fi

  if $capturing; then
    line=$(./scripts/releases/changelog_to_slack_formatter.sh <<< "$line")
    latest_release+="$line\n"
  fi
done < CHANGELOG.md

echo "$latest_release"