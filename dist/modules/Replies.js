import { Platform } from 'react-native';
import { NativeReplies } from '../native';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';
/**
 * Enables and disables everything related to receiving replies.
 * @param isEnabled
 */
export const setEnabled = (isEnabled) => {
    NativeReplies.setEnabled(isEnabled);
};
/**
 * Tells whether the user has chats already or not.
 * @param callback callback that is invoked if chats exist
 */
export const hasChats = (callback) => {
    NativeReplies.hasChats(callback);
};
/**
 * Manual invocation for replies.
 */
export const show = () => {
    NativeReplies.show();
};
/**
 * Sets a block of code that gets executed when a new message is received.
 * @param handler A callback that gets executed when a new message is received.
 */
export const setOnNewReplyReceivedHandler = (handler) => {
    IBGEventEmitter.addListener(NativeReplies, InstabugConstants.ON_REPLY_RECEIVED_HANDLER, handler);
    NativeReplies.setOnNewReplyReceivedHandler(handler);
};
/**
 * Returns the number of unread messages the user currently has.
 * Use this method to get the number of unread messages the user
 * has, then possibly notify them about it with your own UI.
 * @param callback callback with argument
 * Notifications count, or -1 in case the SDK has not been initialized.
 */
export const getUnreadRepliesCount = (callback) => {
    NativeReplies.getUnreadRepliesCount(callback);
};
/**
 * Enables/disables showing in-app notifications when the user receives a
 * new message.
 * @param isEnabled A boolean to set whether
 * notifications are enabled or disabled.
 */
export const setInAppNotificationsEnabled = (isEnabled) => {
    NativeReplies.setInAppNotificationEnabled(isEnabled);
};
/**
 * Set whether new in app notification received will play a small sound notification
 * or not (Default is {@code false})
 * @android
 *
 * @param isEnabled desired state of conversation sounds
 */
export const setInAppNotificationSound = (isEnabled) => {
    if (Platform.OS === 'android') {
        NativeReplies.setInAppNotificationSound(isEnabled);
    }
};
/**
 * Enables/disables the use of push notifications in the SDK.
 * Defaults to YES.
 * @param isEnabled A boolean to indicate whether push notifications are enabled or disabled.
 */
export const setPushNotificationsEnabled = (isEnabled) => {
    NativeReplies.setPushNotificationsEnabled(isEnabled);
};
/**
 * Set the GCM registration token to Instabug
 *
 * @param token the GCM registration token
 */
export const setPushNotificationRegistrationTokenAndroid = (token) => {
    if (Platform.OS === 'android') {
        NativeReplies.setPushNotificationRegistrationToken(token);
    }
};
/**
 * Show in-app Messaging's notifications
 *
 * @param data the data bundle related to Instabug
 */
export const showNotificationAndroid = (data) => {
    if (Platform.OS === 'android') {
        NativeReplies.showNotification(data);
    }
};
/**
 * Set the push notification's icon that will be shown with Instabug notifications
 *
 * @param resourceId the notification icon resource ID
 */
export const setNotificationIconAndroid = (resourceId) => {
    if (Platform.OS === 'android') {
        NativeReplies.setNotificationIcon(resourceId);
    }
};
/**
 * Set a notification channel id to a notification channel that notifications
 * can be posted to.
 *
 * @param id an id to a notification channel that notifications
 */
export const setPushNotificationChannelIdAndroid = (id) => {
    if (Platform.OS === 'android') {
        NativeReplies.setPushNotificationChannelId(id);
    }
};
/**
 * Set whether new system notification received will play the default sound from
 * RingtoneManager or not (Default is {@code false})
 *
 * @param isEnabled desired state of conversation sounds
 */
export const setSystemReplyNotificationSoundEnabledAndroid = (isEnabled) => {
    if (Platform.OS === 'android') {
        NativeReplies.setSystemReplyNotificationSoundEnabled(isEnabled);
    }
};
