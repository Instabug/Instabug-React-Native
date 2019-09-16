export const ReactNativeIds = {
  APP_MAIN_VIEW: 'appMainView',
  INVOKE_BTN: 'invokeBtn',
  ENABLE_FLOATING_BTN: 'enableFloatingBtnVisibilityBtn',
};

export const ReactNativeActions = {
  async checkRnSanity() {
    await expect(element(by.id(ReactNativeIds.APP_MAIN_VIEW))).toBeVisible();
  },
  async tapOnInvokeBtn() {
    await element(by.id(ReactNativeIds.INVOKE_BTN)).tap();
  },
  async tapOnEnableFloatingBtn() {
    await element(by.id(ReactNativeIds.ENABLE_FLOATING_BTN)).tap();
  },
};