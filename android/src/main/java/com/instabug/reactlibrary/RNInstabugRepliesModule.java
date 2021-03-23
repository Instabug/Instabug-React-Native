package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.instabug.chat.Replies;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import javax.annotation.Nonnull;
import java.util.HashMap;
import java.util.Map;

public class RNInstabugRepliesModule extends ReactContextBaseJavaModule {

    public RNInstabugRepliesModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGReplies";
    }

    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        Replies.setState(Feature.State.ENABLED);
                    } else {
                        Replies.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void hasChats(final Callback callback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                boolean hasChats = Replies.hasChats();
                callback.invoke(hasChats);
            }
        });
    }

    @ReactMethod
    public void show() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Replies.show();
            }
        });
    }

    /**
     * Set whether new in app notification received will play a small sound notification
     * or not (Default is {@code false})
     *
     * @param shouldPlaySound desired state of conversation sounds
     * @since 4.1.0
     */
    @ReactMethod
    public void setInAppNotificationSound(final boolean shouldPlaySound) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Replies.setInAppNotificationSound(shouldPlaySound);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Get current unread count of messages for this user
     *
     * @return number of messages that are unread for this user
     */
    @ReactMethod
    public void getUnreadRepliesCount(final Callback messageCountCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                int unreadMessages = 0;
                try {
                    unreadMessages = Replies.getUnreadRepliesCount();
                } catch (Exception e) {
                    e.printStackTrace();
                }

                messageCountCallback.invoke(unreadMessages);
            }
        });
    }

    /**
     * Enabled/disable push notifications
     *
     * @param isEnabled whether chat push notifications is enabled or not
     */
    @ReactMethod
    public void setPushNotificationsEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        Replies.setPushNotificationState(Feature.State.ENABLED);
                    } else {
                        Replies.setPushNotificationState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enabled/disable chat notification
     *
     * @param isChatNotificationEnable whether chat notification is reburied or not
     */
    @ReactMethod
    public void setInAppNotificationEnabled(final boolean isChatNotificationEnable) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Replies.setInAppNotificationEnabled(isChatNotificationEnable);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set the GCM registration token to Instabug
     *
     * @param token the GCM registration token
     */
    @ReactMethod
    public void setPushNotificationRegistrationToken(final String token) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Replies.setPushNotificationRegistrationToken(token);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Show in-app Messaging's notifications
     *
     * @param data the data bundle related to Instabug
     */
    @ReactMethod
    public void showNotification(final ReadableMap data) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Map<String, String> map = new HashMap<>();
                    ReadableMapKeySetIterator iterator = data.keySetIterator();

                    while (iterator.hasNextKey()) {
                        String key = iterator.nextKey();
                        ReadableType type = data.getType(key);

                        switch(type) {
                            case String:
                                String value = data.getString(key);
                                map.put(key, value);
                                break;
                        }
                    }
                    if (Replies.isInstabugNotification(map)) {
                        Replies.showNotification(map);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set the push notification's icon that will be shown with Instabug notifications
     *
     * @param notificationIcon the notification icon resource ID
     */
    @ReactMethod
    public void setNotificationIcon(final int notificationIcon) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Replies.setNotificationIcon(notificationIcon);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }


    /**
    * Set a notification channel id to a notification channel that notifications
    * can be posted to.
    *
    * @param pushNotificationChannelId an id to a notification channel that notifications
    */
    @ReactMethod
    public void setPushNotificationChannelId(final String pushNotificationChannelId) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Replies.setPushNotificationChannelId(pushNotificationChannelId);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set whether new system notification received will play the default sound from
     * RingtoneManager or not (Default is {@code false})
     *
     * @param shouldPlaySound desired state of conversation sounds
     */
    @ReactMethod
    public void setSystemReplyNotificationSoundEnabled(final boolean shouldPlaySound) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Replies.setSystemReplyNotificationSoundEnabled(shouldPlaySound);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void setOnNewReplyReceivedHandler(final Callback onNewReplyReceivedCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Runnable onNewReplyReceivedRunnable = new Runnable() {
                        @Override
                        public void run() {
                            InstabugUtil.sendEvent(getReactApplicationContext(), Constants.IBG_ON_NEW_REPLY_RECEIVED_CALLBACK, null);
                        }
                    };
                    Replies.setOnNewReplyReceivedCallback(onNewReplyReceivedRunnable);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }
}
