import {NativeModules} from "react-native";
let {Instabug} = NativeModules;

/**
 * FeatureRequests
 * @exports FeatureRequests
 */
export default {

   /**
     * Sets whether users are required to enter an email address or not when
     * sending reports.
     * Defaults to YES.
     * @param {boolean} isEmailFieldRequired A boolean to indicate whether email
     * field is required or not.
     * @param {actionTypes} actionTypes An enum that indicates which action
     *                                  types will have the isEmailFieldRequired
     */

    setEmailFieldRequired: function(isEmailFieldRequired, actionTypes) {
        Instabug.setEmailFieldRequiredForFeatureRequests(isEmailFieldRequired, actionTypes);
    },

    /**
      * Shows the UI for feature requests list
      *
      */
     show: function() {
        Instabug.showFeatureRequests();
    },

    /**
     * Instabug action types.
     * @readonly
     * @enum {number}
     */
    actionTypes: {
        allActions: Instabug.allActions,
        reportBug: Instabug.reportBugAction,
        requestNewFeature: Instabug.requestNewFeature,
        addCommentToFeature: Instabug.addCommentToFeature
    }
}