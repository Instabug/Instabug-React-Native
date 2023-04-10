import { danger, fail, schedule, warn } from 'danger';

const hasSourceChanges = danger.git.modified_files.some((file) => file.startsWith('src/'));
const declaredTrivial =
  !hasSourceChanges || danger.github.issue.labels.some((label) => label.name === 'trivial');

// Make sure PR has a description.
async function hasDescription() {
  const linesOfCode = (await danger.git.linesOfCode()) ?? 0;
  const hasNoDiscription = danger.github.pr.body.includes('> Description goes here');
  if (hasNoDiscription && linesOfCode > 10) {
    fail('Please provide a summary of the changes in the pull request description.');
  }

  if (!danger.git.modified_files.includes('CHANGELOG.md') && !declaredTrivial) {
    warn(
      'You have not included a CHANGELOG entry! \nYou can find it at [CHANGELOG.md](https://github.com/Instabug/Instabug-React-Native/blob/master/CHANGELOG.md).',
    );
  }
}

schedule(hasDescription());
