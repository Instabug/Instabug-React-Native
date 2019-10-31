import { getId } from '../utilities/native-utility';
import { NativeActions as InstabugNativeActions, NativeIds as InstabugNativeIds } from './native-actions';
import { ReactNativeActions } from '../utilities/rn-utility';
import { DEFAULT_TIMEOUT } from '../utilities/settings';

describe('Invoking Prompt Options', () => {
  it('should show the app main view', async () => {
    // RN Sanity
    await ReactNativeActions.checkRnSanity();
  });
  
  it('should show instabug prompt options when calling Instabug.show()', async () => {
    // Action
    await ReactNativeActions.tapOnInvokeBtn();
    
    // Expectation
    await waitFor(element(by.nativeId(getId(InstabugNativeIds.PROMPT_TITLE)))).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(element(by.nativeId(getId(InstabugNativeIds.PROMPT_TITLE)))).toBeVisible();
  });

  it('should show instabug prompt options when tapping the floating button', async () => {
    // Prepare
    await ReactNativeActions.tapOnEnableFloatingBtn();

    // Action
    await InstabugNativeActions.tapOnFloatingBtn();
    
    // Expectation
    await waitFor(element(by.nativeId(getId(InstabugNativeIds.PROMPT_TITLE)))).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(element(by.nativeId(getId(InstabugNativeIds.PROMPT_TITLE)))).toBeVisible();
  });

  it('[iOS_Only] should show instabug prompt options when shaking the device', async () => {
    if (device.getPlatform() === 'ios') {
      // Action
      await device.shake();

      // Expectation
      await waitFor(element(by.nativeId(getId(InstabugNativeIds.PROMPT_TITLE)))).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
      await expect(element(by.nativeId(getId(InstabugNativeIds.PROMPT_TITLE)))).toBeVisible();
    }
  });
});
