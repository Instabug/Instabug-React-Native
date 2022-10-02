import { Platform } from 'react-native';
import { NativeReplies } from '../native';
import IBGEventEmitter from '../utils/IBGEventEmitter';
import InstabugConstants from '../utils/InstabugConstants';

export namespace Replies {
  /**
   * Enables and disables everything related to receiving replies.
   * @param isEnabled
   */
  export const setEnabled = (isEnabled: boolean) => {
    NativeReplies.setEnabled(isEnabled);
  };

  /**
   * Tells whether the user has chats already or not.
   * @param callback callback that is invoked if chats exist
   */
  export const hasChats = (callback: (hasChats: boolean) => void) => {
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
   * @param onNewReplyReceivedHandler A callback that gets executed when a new message is received.
   */
  export const setOnNewReplyReceivedHandler = (onNewReplyReceivedHandler: () => void) => {
    IBGEventEmitter.addListener(
      NativeReplies,
      InstabugConstants.ON_REPLY_RECEIVED_HANDLER,
      onNewReplyReceivedHandler,
    );
    NativeReplies.setOnNewReplyReceivedHandler(onNewReplyReceivedHandler);
  };

  /**
   * Returns the number of unread messages the user currently has.
   * Use this method to get the number of unread messages the user
   * has, then possibly notify them about it with your own UI.
   * @param messageCountCallback callback with argument
   * Notifications count, or -1 in case the SDK has not been initialized.
   */
  export const getUnreadRepliesCount = (messageCountCallback: (count: number) => void) => {
    NativeReplies.getUnreadRepliesCount(messageCountCallback);
  };

  /**
   * Enables/disables showing in-app notifications when the user receives a
   * new message.
   * @param inAppNotificationsEnabled A boolean to set whether
   * notifications are enabled or disabled.
   */
  export const setInAppNotificationsEnabled = (inAppNotificationsEnabled: boolean) => {
    NativeReplies.setInAppNotificationEnabled(inAppNotificationsEnabled);
  };

  /**
   * Set whether new in app notification received will play a small sound notification
   * or not (Default is {@code false})
   * @android
   *
   * @param shouldPlaySound desired state of conversation sounds
   */
  export const setInAppNotificationSound = (shouldPlaySound: boolean) => {
    if (Platform.OS === 'android') {
      NativeReplies.setInAppNotificationSound(shouldPlaySound);
    }
  };

  /**
   * Enables/disables the use of push notifications in the SDK.
   * Defaults to YES.
   * @param isPushNotificationEnabled A boolean to indicate whether push
   * notifications are enabled or disabled.
   */
  export const setPushNotificationsEnabled = (isPushNotificationEnabled: boolean) => {
    NativeReplies.setPushNotificationsEnabled(isPushNotificationEnabled);
  };

  /**
   * Set the GCM registration token to Instabug
   *
   * @param token the GCM registration token
   */
  export const setPushNotificationRegistrationTokenAndroid = (token: string) => {
    if (Platform.OS === 'android') {
      NativeReplies.setPushNotificationRegistrationToken(token);
    }
  };

  /**
   * Show in-app Messaging's notifications
   *
   * @param data the data bundle related to Instabug
   */
  export const showNotificationAndroid = (data: { [key: string]: string }) => {
    if (Platform.OS === 'android') {
      NativeReplies.showNotification(data);
    }
  };

  /**
   * Set the push notification's icon that will be shown with Instabug notifications
   *
   * @param notificationIcon the notification icon resource ID
   */
  export const setNotificationIconAndroid = (notificationIcon: number) => {
    if (Platform.OS === 'android') {
      NativeReplies.setNotificationIcon(notificationIcon);
    }
  };

  /**
   * Set a notification channel id to a notification channel that notifications
   * can be posted to.
   *
   * @param id an id to a notification channel that notifications
   */
  export const setPushNotificationChannelIdAndroid = (id: string) => {
    if (Platform.OS === 'android') {
      NativeReplies.setPushNotificationChannelId(id);
    }
  };

  /**
   * Set whether new system notification received will play the default sound from
   * RingtoneManager or not (Default is {@code false})
   *
   * @param shouldPlaySound desired state of conversation sounds
   */
  export const setSystemReplyNotificationSoundEnabledAndroid = (shouldPlaySound: boolean) => {
    if (Platform.OS === 'android') {
      NativeReplies.setSystemReplyNotificationSoundEnabled(shouldPlaySound);
    }
  };
}
