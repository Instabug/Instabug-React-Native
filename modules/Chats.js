import {
    NativeModules
  } from 'react-native';
  let { IBGChats } = NativeModules;

/**
 * Chats
 * @exports Chats
 */
export default {

    
    /**
     * @deprecated Use {@link BugReporting.setReportTypes} instead.
     * Enables and disables everything related to creating new chats.
     * @param {boolean} isEnabled 
     */
    setEnabled(isEnabled) {
        IBGChats.setEnabled(isEnabled);
    },

    /**
     * @deprecated Use {@link BugReporting.show} instead.
     * Manual invocation for chats view. 
     */
    show() {
        IBGChats.show();
    }
}
