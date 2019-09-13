package com.instabug.reactlibrary;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.bug.BugReporting;
import com.instabug.chat.Chats;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import javax.annotation.Nonnull;

public class RNInstabugChatsModule extends ReactContextBaseJavaModule {

    public RNInstabugChatsModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGChats";
    }

    /**
     * @deprecated Use {@link BugReporting.setReportTypes} instead.
     * Enables or disables the feature Chats.
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        Chats.setState(Feature.State.ENABLED);
                    } else {
                        Chats.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * @deprecated Use {@link BugReporting.show} instead.
     * Show the chats view.
     */
    @ReactMethod
    public void show() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Chats.show();
            }
        });
    }
}
