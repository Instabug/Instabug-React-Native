const fs = require('fs').promises;
import { client } from './setup';

// Increase timeout for potentially slow operations
jest.setTimeout(300000);

// Add retry logic and timeout configuration
const RETRY_ATTEMPTS = 3;
const WAIT_TIMEOUT = 10000;

// Enhanced element getter with retry logic and better error handling
export async function getElement(name: keyof typeof elements) {
  if (!elements.hasOwnProperty(name)) {
    throw new Error(`Element with name ${name} does not exist.`);
  }

  const el = elements[name];
  const getElementFn = process.env.E2E_DEVICE === 'android' ? el.android : el.ios;

  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    try {
      const element = await getElementFn();
      // Wait for element to be interactable
      await element.waitForDisplayed({ timeout: WAIT_TIMEOUT });
      return element;
    } catch (error) {
      if (attempt === RETRY_ATTEMPTS) {
        throw new Error(
          `Failed to get element ${name} after ${RETRY_ATTEMPTS} attempts: ${error.message}`,
        );
      }
      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// Enhanced elements object with better selectors and wait conditions
const elements = {
  floatingButton: {
    ios: () => client.$('~IBGFloatingButtonAccessibilityIdentifier'),
    android: () =>
      client.$('android=new UiSelector().className("android.widget.ImageButton").clickable(true)'),
  },
  reportBugMenuItem: {
    android: () => client.$('android=new UiSelector().text("Report a bug").clickable(true)'),
    ios: () => client.$('-ios predicate string:name == "Report a bug"'),
  },
  emailField: {
    ios: () => client.$('~IBGBugInputViewEmailFieldAccessibilityIdentifier'),
    android: async () => {
      const elements = await client.$$(
        '//android.widget.EditText[@resource-id="com.instabug.react.example:id/ib_edit_text"]',
      );
      return elements[0];
    },
  },
  commentField: {
    ios: () => client.$('~IBGBugInputViewCommentFieldAccessibilityIdentifier'),
    android: async () => {
      const elements = await client.$$(
        '//android.widget.EditText[@resource-id="com.instabug.react.example:id/ib_edit_text"]',
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
    android: () => client.$('android=new UiSelector().text("Thank you!").clickable(true)'),
  },
  settingButton: {
    ios: () => client.$('~Settings, tab, 2 of 2'),
    android: () => client.$('android=new UiSelector().text("Settings").clickable(true)'),
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
};

// Enhanced test suite with better error handling and assertions
describe('Instabug Configuration Validation', () => {
  let configData: any;

  // Add setup and teardown hooks
  beforeAll(async () => {
    // Add any necessary setup
    await client.setImplicitTimeout(5000);
  });

  afterAll(async () => {
    // Add cleanup if needed
  });

  it('should verify React Native button visibility', async () => {
    try {
      if (process.env.E2E_DEVICE === 'android') {
        const reactNativeButton = await client.$(
          '//android.widget.Button[@resource-id="com.instabug.hybridsampleapp:id/button_react_native"]',
        );
        await reactNativeButton.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        expect(await reactNativeButton.isDisplayed()).toBe(true);
      } else {
        const floatingButton = await getElement('floatingButton');
        await floatingButton.click();

        const reportBugMenu = await getElement('reportBugMenuItem');
        await reportBugMenu.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        expect(await reportBugMenu.isDisplayed()).toBe(true);
      }
    } catch (error) {
      throw new Error(`Failed to verify button visibility: ${error.message}`);
    }
  });

  test('should contain correct session replay URL in configuration', async () => {
    try {
      const jsonData = await fs.readFile('./captured_response.json');
      configData = JSON.parse(jsonData);

      // Add more specific assertions
      expect(configData).toHaveProperty('session_replay', expect.any(Object));
      expect(configData.session_replay).toHaveProperty('url', expect.any(String));

      const expectedUrl =
        'https://dream11.instabug.com/applications/dream11/production/session-replay';
      expect(configData.session_replay.url).toBe(expectedUrl);
    } catch (error) {
      throw new Error(`Failed to verify session replay configuration: ${error.message}`);
    }
  });
});
