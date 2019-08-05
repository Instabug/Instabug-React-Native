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
     * Enables and disables everything related to creating new chats.
     * @param {boolean} isEnabled 
     */
    setEnabled(isEnabled) {
        IBGChats.setEnabled(isEnabled);
    },

    /**
     * Manual invocation for chats view. 
     */
    show() {
        IBGChats.show();
    }
}
