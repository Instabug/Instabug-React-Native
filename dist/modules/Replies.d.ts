/**
 * Enables and disables everything related to receiving replies.
 * @param isEnabled
 */
export declare const setEnabled: (isEnabled: boolean) => void;
/**
 * Tells whether the user has chats already or not.
 */
export declare const hasChats: () => Promise<boolean>;
/**
 * Manual invocation for replies.
 */
export declare const show: () => void;
/**
 * Sets a block of code that gets executed when a new message is received.
 * @param handler A callback that gets executed when a new message is received.
 */
export declare const setOnNewReplyReceivedHandler: (handler: () => void) => void;
/**
 * Returns the number of unread messages the user currently has.
 * Use this method to get the number of unread messages the user
 * has, then possibly notify them about it with your own UI.
 * Notifications count, or -1 in case the SDK has not been initialized.
 */
export declare const getUnreadRepliesCount: () => Promise<number>;
/**
 * Enables/disables showing in-app notifications when the user receives a
 * new message.
 * @param isEnabled A boolean to set whether
 * notifications are enabled or disabled.
 */
export declare const setInAppNotificationsEnabled: (isEnabled: boolean) => void;
/**
 * Set whether new in app notification received will play a small sound notification
 * or not (Default is {@code false})
 * @android
 *
 * @param isEnabled desired state of conversation sounds
 */
export declare const setInAppNotificationSound: (isEnabled: boolean) => void;
/**
 * Enables/disables the use of push notifications in the SDK.
 * Defaults to YES.
 * @param isEnabled A boolean to indicate whether push notifications are enabled or disabled.
 */
export declare const setPushNotificationsEnabled: (isEnabled: boolean) => void;
/**
 * Set the GCM registration token to Instabug
 *
 * @param token the GCM registration token
 */
export declare const setPushNotificationRegistrationTokenAndroid: (token: string) => void;
/**
 * Show in-app Messaging's notifications
 *
 * @param data the data bundle related to Instabug
 */
export declare const showNotificationAndroid: (data: Record<string, string>) => void;
/**
 * Set the push notification's icon that will be shown with Instabug notifications
 *
 * @param resourceId the notification icon resource ID
 */
export declare const setNotificationIconAndroid: (resourceId: number) => void;
/**
 * Set a notification channel id to a notification channel that notifications
 * can be posted to.
 *
 * @param id an id to a notification channel that notifications
 */
export declare const setPushNotificationChannelIdAndroid: (id: string) => void;
/**
 * Set whether new system notification received will play the default sound from
 * RingtoneManager or not (Default is {@code false})
 *
 * @param isEnabled desired state of conversation sounds
 */
export declare const setSystemReplyNotificationSoundEnabledAndroid: (isEnabled: boolean) => void;
