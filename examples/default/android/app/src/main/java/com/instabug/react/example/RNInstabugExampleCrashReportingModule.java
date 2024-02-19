package com.instabug.react.example;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.library.Feature;
import com.instabug.reactlibrary.RNInstabugReactnativeModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

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
    public void sendNativeNonFatal(final String exceptionObject) {
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
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @ReactMethod
    public void sendFatalHang() {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @ReactMethod
    public void sendOOM() {
        oomCrash();
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
