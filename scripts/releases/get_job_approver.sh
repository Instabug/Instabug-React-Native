jobsJson=$(curl -s -X GET "https://circleci.com/api/v2/workflow/$CIRCLE_WORKFLOW_ID/job" --header "Circle-Token: $CIRCLE_TOKEN")

#jobsJson=$(echo "$jobsJson" | jq -R '.' | jq -s '.' | jq -r 'join("")')
job=$(jq '.items[] | select(.name == "hold_release_slack_notification")' <<< "$jobsJson")

#job=$(echo "$job" | jq -R '.' | jq -s '.' | jq -r 'join("")')
approver_id=$(jq '.approved_by' <<< "$job")

approver_id=$(tr -d '"' <<< "$approver_id")

user=$(curl -s -X GET "https://circleci.com/api/v2/user/$approver_id" --header "Circle-Token: $CIRCLE_TOKEN")

#user=$(echo "$user" | jq -R '.' | jq -s '.' | jq -r 'join("")')
username=$(jq '.login' <<< "$user")

username=$(tr -d '"' <<< "$username")

slack_id=$(./scripts/releases/get_slack_id_from_username.sh "$username")

echo "$slack_id"