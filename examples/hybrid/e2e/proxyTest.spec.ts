const fs = require('fs').promises;
import { client } from './setup';
jest.setTimeout(300000);
export function getElement(name: keyof typeof elements) {
  if (!elements.hasOwnProperty(name)) {
    throw new Error(`Element with name ${name} does not exist.`);
  }

  const el = elements[name];
  if (process.env.E2E_DEVICE === 'android') {
    return el.android();
  }

  return el.ios();
}
const elements = {
  floatingButton: {
    ios: () => client.$('~IBGFloatingButtonAccessibilityIdentifier'),
    android: () => client.$('android=new UiSelector().className("android.widget.ImageButton")'),
  },
  reportBugMenuItem: {
    android: () => client.$('android=new UiSelector().text("Report a bug")'),
    ios: () => client.$('-ios predicate string:name == "Report a bug"'),
  },
  emailField: {
    ios: () => client.$('~IBGBugInputViewEmailFieldAccessibilityIdentifier'),
    android: () =>
      client.$$(
        '//android.widget.EditText[@resource-id="com.instabug.react.example:id/ib_edit_text"]',
      )[0],
  },
  commentField: {
    ios: () => client.$('~IBGBugInputViewCommentFieldAccessibilityIdentifier'),
    android: () =>
      client.$$(
        '//android.widget.EditText[@resource-id="com.instabug.react.example:id/ib_edit_text"]',
      )[1],
  },
  sendBugButton: {
    ios: () => client.$('~IBGBugVCNextButtonAccessibilityIdentifier'),
    android: () => client.$('//android.widget.TextView[@content-desc="Send bug report Button"]'),
  },
  thanksMessage: {
    ios: () => client.$('-ios predicate string:name == "Thank you"'),
    android: () => client.$('android=new UiSelector().text("Thank you!")'),
  },
  settingButton: {
    ios: () => client.$('~Settings, tab, 2 of 2'),
    android: () => client.$('android=new UiSelector().text("Settings")'),
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
describe('Instabug Configuration Validation', () => {
  let configData: any;
  it('test', async () => {
    if (process.env.E2E_DEVICE === 'android') {
      client
        .$(
          '//android.widget.Button[@resource-id="com.instabug.hybridsampleapp:id/button_react_native"]',
        )
        .isDisplayed();
    } else {
      await getElement('floatingButton').click();
      await getElement('reportBugMenuItem').isDisplayed();
    }
  });
  test('should contain correct session replay URL in configuration', async () => {
    const jsonData = await fs.readFile('./captured_response.json');
    configData = JSON.parse(jsonData);

    expect(configData).toHaveProperty('session_replay');

    expect(configData.session_replay).toHaveProperty('url');

    const expectedUrl =
      'https://dream11.instabug.com/applications/dream11/production/session-replay';
    expect(configData.session_replay.url).toBe(expectedUrl);
  });
});
