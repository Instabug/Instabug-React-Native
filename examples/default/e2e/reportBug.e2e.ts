import { expect, waitFor } from 'detox';

import { getElement } from './utils/elements';
import mockData from './utils/mockData';

beforeEach(async () => {
  await device.launchApp();
  await device.reloadReactNative();
  await device.setURLBlacklist(['https://api.instabug.com']);
});

it('reports a bug', async () => {
  const floatingButton = getElement('floatingButton');
  await waitFor(floatingButton).toBeVisible().withTimeout(30000);
  await floatingButton.tap();
  const reportBugMenuItemButton = getElement('reportBugMenuItem');
  await waitFor(reportBugMenuItemButton).toBeVisible().withTimeout(30000);
  await reportBugMenuItemButton.tap();

  await getElement('emailField').typeText(mockData.email);
  await getElement('commentField').typeText(mockData.bugComment);
  await getElement('sendBugButton').tap();

  await expect(getElement('thanksMessage')).toBeVisible();
});
