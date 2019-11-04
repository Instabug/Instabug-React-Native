import { getId } from '../utilities/native-utility';
import { DEFAULT_TIMEOUT } from '../utilities/settings';
import TestData from './test-data';

export const NativeIds = {
  EMAIL_FIELD: {
    IOS: 'IBGBugInputViewEmailFieldAccessibilityIdentifier',
    ANDROID: 'instabug_edit_text_email',
  },
  SEND_BUG_BTN: {
    IOS: 'IBGBugVCNextButtonAccessibilityIdentifier',
    ANDROID: 'instabug_bugreporting_send',
  },
  SUCCESS_POPUP_MSG: {
    ANDROID: 'instabug_txt_success_note',
  },
};

export const NativeTexts = {
  SUCCESS_POPUP_HEADER: {
    IOS: 'Thank you',
    ANDROID: 'Thank you!',
  },
};

export const NativeActions = {
  async fillOnBugPromptOption() {
    const emailField = element(by.nativeId(getId(NativeIds.EMAIL_FIELD)));
    await waitFor(emailField).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await emailField.tap();
    await emailField.clearText();
    await emailField.typeText(TestData.email);
  },
  async tapOnSendBugReportBtn() {
    const sendBugBtn = element(by.nativeId(getId(NativeIds.SEND_BUG_BTN)));
    await waitFor(sendBugBtn).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await sendBugBtn.tap();
  },
};
