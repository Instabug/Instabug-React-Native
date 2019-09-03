package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.chat.Replies;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;

import javax.annotation.Nonnull;

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
        new Handler(Looper.getMainLooper()).post(new Runnable() {
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
    public void hasChats(Callback callback) {
        boolean hasChats = Replies.hasChats();
        callback.invoke(hasChats);

    }

    @ReactMethod
    public void show() {
        Replies.show();
    }

    /**
     * Set whether new in app notification received will play a small sound notification
     * or not (Default is {@code false})
     *
     * @param shouldPlaySound desired state of conversation sounds
     * @since 4.1.0
     */
    @ReactMethod
    public void setInAppNotificationSound(boolean shouldPlaySound) {
        try {
            Replies.setInAppNotificationSound(shouldPlaySound);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Get current unread count of messages for this user
     *
     * @return number of messages that are unread for this user
     */
    @ReactMethod
    public void getUnreadRepliesCount(Callback messageCountCallback) {
        int unreadMessages = 0;
        try {
            unreadMessages = Replies.getUnreadRepliesCount();
        } catch (Exception e) {
            e.printStackTrace();
        }

        messageCountCallback.invoke(unreadMessages);
    }

    /**
     * Enabled/disable chat notification
     *
     * @param isChatNotificationEnable whether chat notification is reburied or not
     */
    @ReactMethod
    public void setInAppNotificationEnabled(boolean isChatNotificationEnable) {
        try {
            Replies.setInAppNotificationEnabled(isChatNotificationEnable);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void setOnNewReplyReceivedHandler(final Callback onNewReplyReceivedCallback) {
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
}
