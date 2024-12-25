const fs = require('fs').promises;
import { client } from './setup';

// Configuration
jest.setTimeout(300000);
const RETRY_ATTEMPTS = 3;
const WAIT_TIMEOUT = 10000;

// Enhanced element getter with retry logic
export async function getElement(name: keyof typeof elements) {
  if (!elements.hasOwnProperty(name)) {
    throw new Error(`Element with name ${name} does not exist.`);
  }

  const el = elements[name];
  const getElementFn = process.env.E2E_DEVICE === 'android' ? el.android : el.ios;

  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    try {
      const element = await getElementFn();
      // Add stability check
      await client.waitUntil(
        async () => {
          try {
            return await element.isDisplayed();
          } catch {
            return false;
          }
        },
        {
          timeout: WAIT_TIMEOUT,
          timeoutMsg: `Element ${name} not displayed after ${WAIT_TIMEOUT}ms`,
          interval: 500,
        },
      );
      return element;
    } catch (error) {
      if (attempt === RETRY_ATTEMPTS) {
        throw new Error(`Failed to get element ${name}: ${error.message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const elements = {
  floatingButton: {
    ios: () => client.$('~IBGFloatingButtonAccessibilityIdentifier'),
    android: () =>
      client.$('//android.widget.ImageButton[contains(@class, "android.widget.ImageButton")]'),
  },
  reportBugMenuItem: {
    android: () => client.$('//android.widget.TextView[@text="Report a bug"]'),
    ios: () => client.$('-ios predicate string:name == "Report a bug"'),
  },
  emailField: {
    ios: () => client.$('~IBGBugInputViewEmailFieldAccessibilityIdentifier'),
    android: async () => {
      const elements = await client.$$(
        'android=new UiSelector().resourceId("com.instabug.react.example:id/ib_edit_text")',
      );
      return elements[0];
    },
  },
  commentField: {
    ios: () => client.$('~IBGBugInputViewCommentFieldAccessibilityIdentifier'),
    android: async () => {
      const elements = await client.$$(
        'android=new UiSelector().resourceId("com.instabug.react.example:id/ib_edit_text")',
      );
      return elements[1];
    },
  },
  sendBugButton: {
    ios: () => client.$('~IBGBugVCNextButtonAccessibilityIdentifier'),
    android: () => client.$('//android.widget.TextView[@content-desc="Send bug report Button"]'),
  },
  thanksMessage: {
    ios: () => client.$('-ios predicate string:name == "Thank you"'),
    android: () => client.$('//android.widget.TextView[@text="Thank you!"]'),
  },
  settingButton: {
    ios: () => client.$('~Settings, tab, 2 of 2'),
    android: () => client.$('//android.widget.TextView[@text="Settings"]'),
  },
  AttributeKey: {
    ios: () => client.$('UserAttributeKeyLabel'),
    android: () => client.$('//android.widget.EditText[@content-desc="UserAttributeKeyLabel"]'),
  },
  AttributeValue: {
    ios: () => client.$('UserAttributeValueLabel'),
    android: () => client.$('//android.widget.EditText[@content-desc="UserAttributeValueLabel"]'),
  },
  SaveUserAttributesButton: {
    ios: () => client.$('SaveUserAttributesButton'),
    android: () => client.$('//android.widget.Button[@content-desc="saveUserAttributesButton"]'),
  },
  systemUIWaitButton: {
    android: () =>
      client.$('//android.widget.Button[@resource-id="android:id/aerr_wait"][@text="Wait"]'),
    ios: () => client.$(''), // iOS implementation would go here if needed
  },
  systemUIDialog: {
    android: () => client.$('//android.widget.TextView[@text="System UI isn\'t responding"]'),
    ios: () => client.$(''), // iOS implementation would go here if needed
  },
};
describe('System UI Dialog Handling', () => {

  it('should handle System UI not responding dialog continuously', async () => {
    try {
      if (process.env.E2E_DEVICE === 'android') {
        let dialogVisible = true;

        while (dialogVisible) {
          try {
            // Wait for the System UI dialog to appear
            await client.waitUntil(
              async () => {
                try {
                  const dialog = await elements.systemUIDialog.android();
                  return await dialog.isDisplayed();
                } catch {
                  return false;
                }
              },
              {
                timeout: WAIT_TIMEOUT,
                timeoutMsg: `System UI dialog not visible after ${WAIT_TIMEOUT}ms`,
                interval: 1000,
              },
            );

            // Get and click the Wait button
            const waitButton = await elements.systemUIWaitButton.android();
            if (await waitButton.isDisplayed()) {
              await waitButton.click();

              // Wait a bit before checking if dialog is still visible
              await client.pause(2000);

              // Check if dialog is still visible
              try {
                const dialog = await elements.systemUIDialog.android();
                dialogVisible = await dialog.isDisplayed();
              } catch {
                dialogVisible = false;
              }
            } else {
              dialogVisible = false;
            }
          } catch (error) {
            // If waitUntil times out, assume dialog is no longer visible
            dialogVisible = false;
          }

          // Add a small pause between iterations to prevent excessive CPU usage
          await client.pause(1000);
        }

        // Final verification that dialog is dismissed
        await client.waitUntil(
          async () => {
            try {
              const dialog = await elements.systemUIDialog.android();
              return !(await dialog.isDisplayed());
            } catch {
              return true;
            }
          },
          {
            timeout: WAIT_TIMEOUT,
            timeoutMsg: `System UI dialog still visible after ${WAIT_TIMEOUT}ms`,
            interval: 1000,
          },
        );
      }
    } catch (error) {
      throw new Error(`Test failed: ${error.message}`);
    }
  });
});
describe('Instabug Configuration Validation', () => {
  let configData: any;

  it('should verify React Native button visibility', async () => {
    try {
      if (process.env.E2E_DEVICE === 'android') {
        console.log('Current UI XML:', await client.getPageSource());

        const selector =
          'android=new UiSelector().resourceId("com.instabug.hybridsampleapp:id/button_react_native")';
        await client.waitUntil(
          async () => {
            try {
              const element = await client.$(selector);
              return await element.isDisplayed();
            } catch {
              return false;
            }
          },
          {
            timeout: WAIT_TIMEOUT,
            timeoutMsg: `React Native button not visible after ${WAIT_TIMEOUT}ms`,
            interval: 1000,
          },
        );

        const button = await client.$(selector);
        expect(await button.isDisplayed()).toBe(true);
      } else {
        const floatingButton = await getElement('floatingButton');
        await floatingButton.click();

        const reportBugMenu = await getElement('reportBugMenuItem');
        expect(await reportBugMenu.isDisplayed()).toBe(true);
      }
    } catch (error) {
      throw new Error(`Test failed: ${error.message}`);
    }
  });

  test('should contain correct session replay URL in configuration', async () => {
    try {
      const jsonData = await fs.readFile('./captured_response.json', 'utf8');
      configData = JSON.parse(jsonData);

      expect(configData).toHaveProperty('session_replay');
      expect(configData.session_replay).toHaveProperty('url');

      const expectedUrl =
        'https://dream11.instabug.com/applications/dream11/production/session-replay';
      expect(configData.session_replay.url).toBe(expectedUrl);
    } catch (error) {
      throw new Error(`Configuration validation failed: ${error.message}`);
    }
  });
});
