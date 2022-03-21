import { getElement } from './utils/elements';

beforeEach(async () => {
  await device.launchApp();
});

beforeEach(async () => {
  await device.reloadReactNative();
});

it('reports a bug', async () => {
  await getElement('floatingButton').tap();
  await getElement('reportBugMenuItem').tap();

  await getElement('emailField').typeText('rn_e2e@instabug.com');
  await getElement('commentField').typeText('This is a test bug');
  await getElement('sendBugButton').tap();

  await expect(getElement('thanksMessage')).toBeVisible();
});
