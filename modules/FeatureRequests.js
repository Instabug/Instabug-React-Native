import { NativeModules } from "react-native";
let { Instabug, IBGFeatureRequests} = NativeModules;

/**
 * FeatureRequests
 * @exports FeatureRequests
 */
export default {

    /**
     * Enables and disables everything related to feature requests.
     * @param {boolean} isEnabled 
     */
    setEnabled: function (isEnabled) {
        IBGFeatureRequests.setEnabled(isEnabled);
    },
    /**
      * Sets whether users are required to enter an email address or not when
      * sending reports.
      * Defaults to YES.
      * @param {boolean} isEmailFieldRequired A boolean to indicate whether email
      * field is required or not.
      * @param {actionTypes} actionTypes An enum that indicates which action
      *                                  types will have the isEmailFieldRequired
      */

    setEmailFieldRequired: function (isEmailFieldRequired, actionTypes) {
        IBGFeatureRequests.setEmailFieldRequiredForFeatureRequests(isEmailFieldRequired, actionTypes);
    },

    /**
      * Shows the UI for feature requests list
      *
      */
    show: function () {
        IBGFeatureRequests.show();
    },

    /**
     * Instabug action types.
     * @readonly
     * @enum {number}
     */
    actionTypes: {
        requestNewFeature: Instabug.requestNewFeature,
        addCommentToFeature: Instabug.addCommentToFeature
    }
}