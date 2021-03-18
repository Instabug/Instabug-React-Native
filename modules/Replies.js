import { NativeModules, Platform } from 'react-native';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';
let { IBGReplies } = NativeModules;

/**
 * Replies
 * @exports Replies
 */
export default {
  /**
   * Enables and disables everything related to receiving replies.
   * @param {boolean} isEnabled
   */
  setEnabled(isEnabled) {
    IBGReplies.setEnabled(isEnabled);
  },

  /**
   * Tells whether the user has chats already or not.
   * @param {function} callback - callback that is invoked if chats exist
   */
  hasChats(callback) {
    IBGReplies.hasChats(callback);
  },

  /**
   * Manual invocation for replies.
   */
  show() {
    IBGReplies.show();
  },

  /**
   * @deprecated use {@link Replies.setOnNewReplyReceivedHandler}
   * Sets a block of code that gets executed when a new message is received.
   * @param {function} onNewReplyReceivedCallback - A callback that gets
   * executed when a new message is received.
   */
  setOnNewReplyReceivedCallback(onNewReplyReceivedCallback) {
    this.setOnNewReplyReceivedHandler(onNewReplyReceivedCallback);
  },

  /**
   * Sets a block of code that gets executed when a new message is received.
   * @param {function} onNewReplyReceivedHandler - A callback that gets
   * executed when a new message is received.
   */
  setOnNewReplyReceivedHandler(onNewReplyReceivedHandler) {
    IBGEventEmitter.addListener(
      IBGReplies,
      InstabugConstants.ON_REPLY_RECEIVED_HANDLER,
      onNewReplyReceivedHandler
    );
    IBGReplies.setOnNewReplyReceivedHandler(onNewReplyReceivedHandler);
  },

  /**
   * Returns the number of unread messages the user currently has.
   * Use this method to get the number of unread messages the user
   * has, then possibly notify them about it with your own UI.
   * @param {messageCountCallback} messageCountCallback callback with argument
   * Notifications count, or -1 in case the SDK has not been initialized.
   */
  getUnreadRepliesCount: function(messageCountCallback) {
    IBGReplies.getUnreadRepliesCount(messageCountCallback);
  },

  /**
   * Enables/disables showing in-app notifications when the user receives a
   * new message.
   * @param {boolean} inAppNotificationsEnabled A boolean to set whether
   * notifications are enabled or disabled.
   */
  setInAppNotificationsEnabled: function(inAppNotificationsEnabled) {
    IBGReplies.setInAppNotificationEnabled(inAppNotificationsEnabled);
  },

  /**
   * Set whether new in app notification received will play a small sound notification
   * or not (Default is {@code false})
   * @android
   *
   * @param shouldPlaySound desired state of conversation sounds
   */
  setInAppNotificationSound: function(shouldPlaySound) {
    if (Platform.OS === 'android') {
      IBGReplies.setInAppNotificationSound(shouldPlaySound);
    }
  },

  /**
   * Enables/disables the use of push notifications in the SDK.
   * Defaults to YES.
   * @param {boolean} isPushNotificationEnabled A boolean to indicate whether push
   * notifications are enabled or disabled.
   */
  setPushNotificationsEnabled(isPushNotificationEnabled) {
    IBGReplies.setPushNotificationsEnabled(isPushNotificationEnabled);
  },

  /**
   * Set the GCM registration token to Instabug
   *
   * @param token the GCM registration token
   */
  setPushNotificationRegistrationTokenAndroid(token) {
    if (Platform.OS === 'android') {
      IBGReplies.setPushNotificationRegistrationToken(token);
    }
  },

  /**
   * Show in-app Messaging's notifications
   *
   * @param data the data bundle related to Instabug
   */
   showNotificationAndroid(data) {
    if (Platform.OS === 'android') {
      IBGReplies.showNotification(data);
    }
  },

  /**
   * Set the push notification's icon that will be shown with Instabug notifications
   *
   * @param notificationIcon the notification icon resource ID
   */
  setNotificationIconAndroid(notificationIcon) {
    if (Platform.OS === 'android') {
      IBGReplies.setNotificationIcon(notificationIcon);
    }
  },

  /**
   * Set a notification channel id to a notification channel that notifications
   * can be posted to.
   *
   * @param pushNotificationChannelId an id to a notification channel that notifications
   */
  setPushNotificationChannelIdAndroid(pushNotificationChannelId) {
    if (Platform.OS === 'android') {
      IBGReplies.setPushNotificationChannelId(pushNotificationChannelId);
    }
  },

  /**
   * Set whether new system notification received will play the default sound from
   * RingtoneManager or not (Default is {@code false})
   *
   * @param shouldPlaySound desired state of conversation sounds
   */
  setSystemReplyNotificationSoundEnabledAndroid(shouldPlaySound) {
    if (Platform.OS === 'android') {
      IBGReplies.setSystemReplyNotificationSoundEnabled(shouldPlaySound);
    }
  }
};
