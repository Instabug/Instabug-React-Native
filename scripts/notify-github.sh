#!/bin/bash

pr_url="https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/pulls?head=$CIRCLE_PROJECT_USERNAME:$CIRCLE_BRANCH&state=open"
pr_response=$(curl --location --request GET "$pr_url" --header "Authorization: Bearer $RELEASE_GITHUB_TOKEN")

if [ $(echo $pr_response | jq length) -eq 0 ]; then
  echo "No PR found to update"
else
  pr_comment_url=$(echo $pr_response | jq -r ".[]._links.comments.href")

  curl --location --request POST "$pr_comment_url" \
    --header 'Content-Type: application/json' \
    --header "Authorization: Bearer $RELEASE_GITHUB_TOKEN" \
    --data-raw "$1"
fi
