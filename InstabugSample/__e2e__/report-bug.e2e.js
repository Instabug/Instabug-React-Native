import { getElement } from './utils/elements';
import mockData from './utils/mock-data';

beforeEach(async () => {
  await device.launchApp();
});

beforeEach(async () => {
  await device.reloadReactNative();
});

it('reports a bug', async () => {
  await getElement('floatingButton').tap();
  await getElement('reportBugMenuItem').tap();

  await getElement('emailField').typeText(mockData.email);
  await getElement('commentField').typeText(mockData.bugComment);
  await getElement('sendBugButton').tap();

  await expect(getElement('thanksMessage')).toBeVisible();
});
