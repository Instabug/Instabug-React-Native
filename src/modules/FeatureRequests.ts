import { NativeFeatureRequests } from '../native';
import { ArgsRegistry } from '../utils/ArgsRegistry';

export namespace FeatureRequests {
  export import actionTypes = ArgsRegistry.actionTypes;

  /**
   * Enables and disables everything related to feature requests.
   *
   * @param isEnabled
   */
  export const setEnabled = (isEnabled: boolean) => {
    NativeFeatureRequests.setEnabled(isEnabled);
  };

  /**
   * Sets whether users are required to enter an email address or not when
   * sending reports.
   * Defaults to YES.
   *
   * @param isEmailFieldRequired A boolean to indicate whether email field is required or not.
   * @param actionTypes An enum that indicates which action types will have the isEmailFieldRequired
   */
  export const setEmailFieldRequired = (
    isEmailFieldRequired: boolean,
    actionTypes: FeatureRequests.actionTypes,
  ) => {
    NativeFeatureRequests.setEmailFieldRequiredForFeatureRequests(
      isEmailFieldRequired,
      actionTypes,
    );
  };

  /**
   * Shows the UI for feature requests list
   */
  export const show = () => {
    NativeFeatureRequests.show();
  };
}
