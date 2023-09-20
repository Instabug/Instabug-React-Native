#!/bin/bash

pr_url="https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/pulls?head=$CIRCLE_PROJECT_USERNAME:$CIRCLE_BRANCH&state=open"
pr_response=$(curl --location --request GET "$pr_url" --header "Authorization: Bearer $RELEASE_GITHUB_TOKEN")

if [ $(echo "$pr_response" | jq length) -eq 0 ]; then
  echo "No PR found, proceeding with branch name instead"

  SNAPSHOT_BRANCH="snapshot/$CIRCLE_BRANCH"
else
  pr_description=$(echo "$pr_response" | jq -r '.[].body')

  SNAPSHOT_BRANCH=$(echo -E "$pr_description" | grep 'Snapshot name:' | cut -d ':' -f 2 | xargs echo -n)

  if [ -z "$SNAPSHOT_BRANCH" ]; then
    echo "No custom snapshot name found, proceeding with default snapshot naming convention"

    version=$(jq -r '.version' package.json)
    jira_id=$(echo -E "$pr_description" | grep 'Jira ID:' | grep -Eo '[A-Z]+-[0-9]+')

    if [ -z "$jira_id" ]; then
      echo "No Jira ID found, proceeding with branch name instead"

      SNAPSHOT_BRANCH="snapshot/$CIRCLE_BRANCH"
    else
      SNAPSHOT_BRANCH="snapshot/$version-$jira_id"
    fi
  fi
fi
