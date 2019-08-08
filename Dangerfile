has_app_changes = !git.modified_files.grep(/lib/).empty?
declared_trivial = (github.pr_title + github.pr_body).include?("#trivial") || !has_app_changes || github.pr_labels.include?("trivial")


# Make sure PR has a description.
if github.pr_body.length < 3 && git.lines_of_code > 10
  fail "Please provide a summary of the changes in the pull request description."
end

if !git.modified_files.include?("CHANGELOG.md") && !declared_trivial
  fail("Please include a CHANGELOG entry. \nYou can find it at [CHANGELOG.md](https://github.com/Instabug/Instabug-Flutter/blob/master/CHANGELOG.md).", sticky: false)
end
