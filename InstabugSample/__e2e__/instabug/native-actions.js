import { getId } from '../utilities/native-utility';
import { DEFAULT_TIMEOUT } from '../utilities/settings';

export const NativeIds = {
  PROMPT_TITLE: {
    IOS: 'IBGPromptVCHeaderAccessibilityIdentifier',
    ANDROID: 'instabug_fragment_title',
  },
  FLOATING_BUTTON: {
    IOS: 'IBGFloatingButtonAccessibilityIdentifier',
    ANDROID: 'instabug_floating_button',
  },
  PROMPT_OPTION_BUG: {
    IOS: 'IBGReportBugPromptOptionAccessibilityIdentifier',
    ANDROID: 'instabug_prompt_option_title',
  },
};

export const NativeActions = {
  async tapOnFloatingBtn() {
    const floatingBtn = element(by.nativeId(getId(NativeIds.FLOATING_BUTTON)));
    await waitFor(floatingBtn).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await floatingBtn.tap();
  },
  async tapOnBugPromptOption() {
    let promptOption;

    if (device.getPlatform() === 'ios') {
      // iOS has a unique id for each prompt option.
      promptOption = element(by.nativeId(getId(NativeIds.PROMPT_OPTION_BUG)));
    } else {
      // Android has a list with identical IDs for all prompt options,
      // so we're matching with text as a second factor for the sake of targetting the correct item.
      promptOption = element(by.nativeId(getId(NativeIds.PROMPT_OPTION_BUG)).and(by.text('Report a bug')));
    }

    await waitFor(promptOption).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await promptOption.tap();
  },
};