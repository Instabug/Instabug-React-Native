import { danger, fail, schedule, warn } from 'danger';

const hasAppChanges = !danger.git.modified_files.some((file) => file.includes('lib'));
const declaredTrivial =
  (danger.github.pr.title + danger.github.pr.body).includes('#trivial') ||
  !hasAppChanges ||
  danger.github.issue.labels.some((label) => label.name === 'trivial');

// Make sure PR has a description.
async function hasDescription() {
  const linesOfCode = (await danger.git.linesOfCode()) ?? 0;
  if (danger.github.pr.body.length < 3 && linesOfCode > 10) {
    fail('Please provide a summary of the changes in the pull request description.');
  }

  if (!danger.git.modified_files.includes('CHANGELOG.md') && !declaredTrivial) {
    warn(
      'You have not included a CHANGELOG entry! \nYou can find it at [CHANGELOG.md](https://github.com/Instabug/Instabug-React-Native/blob/master/CHANGELOG.md).',
    );
  }
}

schedule(hasDescription());
