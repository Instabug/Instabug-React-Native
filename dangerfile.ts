import collectCoverage, { ReportType } from '@instabug/danger-plugin-coverage';
import { danger, fail, schedule, warn } from 'danger';

const hasSourceChanges = danger.git.modified_files.some((file) => file.startsWith('src/'));
const hasModulesChanges = danger.git.modified_files.some((file) => file.startsWith('src/modules/'));
const declaredTrivial =
  !hasSourceChanges || danger.github.issue.labels.some((label) => label.name === 'trivial');

// Make sure PR has a description and calling example.
async function hasDescription() {
  const linesOfCode = (await danger.git.linesOfCode()) ?? 0;
  const hasNoDiscription = danger.github.pr.body.includes('> Description goes here');
  const hasNoExample = danger.github.pr.body.includes('> Example of how to call it');
  if (hasNoDiscription && linesOfCode > 10) {
    fail('Please provide a summary of the changes in the pull request description.');
  }

  if (hasNoExample && linesOfCode > 10 && hasModulesChanges) {
    warn('Please provide example of how to call it.');
  }

  if (!danger.git.modified_files.includes('CHANGELOG.md') && !declaredTrivial) {
    warn(
      'You have not included a CHANGELOG entry! \nYou can find it at [CHANGELOG.md](https://github.com/Instabug/Instabug-React-Native/blob/master/CHANGELOG.md).',
    );
  }
}

schedule(hasDescription());

collectCoverage([
  {
    label: 'JavaScript',
    type: ReportType.LCOV,
    filePath: 'coverage/lcov.info',
    threshold: 90,
  },
  {
    label: 'Android',
    type: ReportType.JACOCO,
    filePath: 'coverage/jacocoTestReport.xml',
    threshold: 40,
  },
  {
    label: 'iOS',
    type: ReportType.XCODE,
    filePath: 'coverage/xcode.json',
    threshold: 30,
  },
]);
