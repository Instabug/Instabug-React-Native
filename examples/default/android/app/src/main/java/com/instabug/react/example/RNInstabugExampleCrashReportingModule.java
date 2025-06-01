package com.instabug.react.example;

import android.content.Context;
import android.os.Handler;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.library.Instabug;
import com.instabug.react.example.nativeLibs.CppNativeLib;

import javax.annotation.Nonnull;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RNInstabugExampleCrashReportingModule extends ReactContextBaseJavaModule {

    public RNInstabugExampleCrashReportingModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "CrashReportingExampleModule";
    }

    @ReactMethod
    public void sendNativeNonFatal() {
        final IBGNonFatalException exception = new IBGNonFatalException.Builder(new IllegalStateException("Test exception"))
                .build();
        CrashReporting.report(exception);

    }

    @ReactMethod
    public void sendNativeFatalCrash() {
        throw new IllegalStateException("Unhandled IllegalStateException from Instabug Test App");
    }

    @ReactMethod
    public void sendANR() {
        sendHang(20000);
    }

    @ReactMethod
    public void sendFatalHang() {
        sendHang(3000);
    }

    private void sendHang(long duration) {
        Context applicationContext = Instabug.getApplicationContext();
        if (applicationContext == null)
            return;

        Handler handler = new Handler(applicationContext.getMainLooper());

        handler.post(() -> {
            try {
                Thread.sleep(duration);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }

    @ReactMethod
    public void sendOOM() {
        oomCrash();
    }

    ////////////////////// NDK SECTION //////////////////////////
    @ReactMethod
    public void sendNDKCrash() {
        CppNativeLib.crashNDK();
    }

    @ReactMethod
    public void causeSIGSEGVCrash() {
        CppNativeLib.causeSIGSEGVCrash();
    }

    @ReactMethod
    public void causeSIGABRTCrash() {
        CppNativeLib.causeSIGABRTCrash();
    }

    @ReactMethod
    public void causeSIGFPECrash() {
        CppNativeLib.causeSIGFPECrash();
    }

    @ReactMethod
    public void causeSIGILLCrash() {
        CppNativeLib.causeSIGILLCrash();
    }

    @ReactMethod
    public void causeSIGBUSCrash() {
        CppNativeLib.causeSIGBUSCrash();
    }

    @ReactMethod
    public void causeSIGTRAPCrash() {
        CppNativeLib.causeSIGTRAPCrash();
    }


    private void oomCrash() {
        new Thread(() -> {
            List<String> stringList = new ArrayList<>();
            for (int i = 0; i < 1_000_000; i++) {
                stringList.add(getRandomString(10_000));
            }
        }).start();
    }

    private String getRandomString(int length) {
        List<Character> charset = new ArrayList<>();
        for (char ch = 'a'; ch <= 'z'; ch++) {
            charset.add(ch);
        }
        for (char ch = 'A'; ch <= 'Z'; ch++) {
            charset.add(ch);
        }
        for (char ch = '0'; ch <= '9'; ch++) {
            charset.add(ch);
        }

        StringBuilder randomString = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            char randomChar = charset.get(random.nextInt(charset.size()));
            randomString.append(randomChar);
        }

        return randomString.toString();
    }

}
