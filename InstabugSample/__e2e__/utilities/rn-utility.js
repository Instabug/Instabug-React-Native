import { DEFAULT_TIMEOUT } from './settings';

export const ReactNativeIds = {
  APP_MAIN_VIEW: 'appMainView',
  INVOKE_BTN: 'invokeBtn',
  ENABLE_FLOATING_BTN: 'enableFloatingBtnVisibilityBtn',
};

export const ReactNativeActions = {
  async checkRnSanity() {
    const appMainView = element(by.id(ReactNativeIds.APP_MAIN_VIEW));

    await waitFor(appMainView).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(appMainView).toBeVisible();
  },
  async tapOnInvokeBtn() {
    const invokeBtn = element(by.id(ReactNativeIds.INVOKE_BTN));

    await waitFor(invokeBtn).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await invokeBtn.tap();
  },
  async tapOnEnableFloatingBtn() {
    const enableFloatingBtn = element(by.id(ReactNativeIds.ENABLE_FLOATING_BTN));

    await waitFor(enableFloatingBtn).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await enableFloatingBtn.tap();
  },
};