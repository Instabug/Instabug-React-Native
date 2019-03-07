import {
    NativeModules
  } from 'react-native';
  let { Instabug } = NativeModules;

/**
 * Chats
 * @exports Chats
 */
module.exports = {
    /**
     * Enables and disables everything related to creating new chats.
     * @param {boolean} isEnabled 
     */
    setEnabled(isEnabled) {
        Instabug.setChatsEnabled(isEnabled);
    },

    /**
     * Manual invocation for chats view. 
     */
    show() {
        Instabug.showChats();
    }
}
