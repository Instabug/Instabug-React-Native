package com.instabug.reactlibrary;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.chat.Replies;
import com.instabug.library.OnSessionReplayLinkReady;
import com.instabug.library.sessionreplay.SessionReplay;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import javax.annotation.Nonnull;

public class RNInstabugSessionReplayModule extends ReactContextBaseJavaModule {

    public RNInstabugSessionReplayModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "IBGSessionReplay";
    }

    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    SessionReplay.setEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void setNetworkLogsEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    SessionReplay.setNetworkLogsEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }


    @ReactMethod
    public void setInstabugLogsEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    SessionReplay.setIBGLogsEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void setUserStepsEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    SessionReplay.setUserStepsEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void getSessionReplayLink(Promise promise) {
        SessionReplay.getSessionReplayLink(s -> MainThreadHandler.runOnMainThread(() -> promise.resolve(s)));


    }
}
