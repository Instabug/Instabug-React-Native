import { actionTypes } from '../utils/ArgsRegistry';
import type { ActionType } from '../utils/Enums';
export { actionTypes };
/**
 * Enables and disables everything related to feature requests.
 *
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Sets whether users are required to enter an email address or not when
 * sending reports.
 * Defaults to YES.
 *
 * @param isEmailFieldRequired A boolean to indicate whether email field is required or not.
 * @param types An enum that indicates which action types will have the isEmailFieldRequired
 */
export declare const setEmailFieldRequired: (isEmailFieldRequired: boolean, type: actionTypes | ActionType) => void;
/**
 * Shows the UI for feature requests list
 */
export declare const show: () => void;
