import { device, element, by } from 'detox';

const elements = {
  floatingButton: {
    ios: () => element(by.id('IBGFloatingButtonAccessibilityIdentifier')),
    android: () => element(by.type('android.widget.ImageButton')),
  },
  reportBugMenuItem: () => element(by.text('Report a bug')),
  emailField: {
    ios: () => element(by.id('IBGBugInputViewEmailFieldAccessibilityIdentifier')),
    android: () => element(by.type('android.widget.EditText')).atIndex(0),
  },
  commentField: {
    ios: () => element(by.id('IBGBugInputViewCommentFieldAccessibilityIdentifier')),
    android: () => element(by.type('android.widget.EditText')).atIndex(1),
  },
  sendBugButton: {
    ios: () => element(by.id('IBGBugVCNextButtonAccessibilityIdentifier')),
    android: () => element(by.type('androidx.appcompat.widget.ActionMenuView')),
  },
  thanksMessage: {
    ios: () => element(by.text('Thank you')),
    android: () => element(by.text('Thank you!')),
  },
};

/**
 * Get element based on current platform.
 *
 * @param {keyof elements} name
 */
export function getElement(name) {
  if (!elements.hasOwnProperty(name)) {
    throw new Error(`Element with name ${name} does not exist.`);
  }

  const el = elements[name];

  if (typeof el === 'function') {
    return el();
  }

  if (device.getPlatform() === 'ios') {
    return el.ios();
  }

  return el.android();
}
