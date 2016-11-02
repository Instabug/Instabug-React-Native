
package com.instabug.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.app.Application;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugTrackingDelegate;
import com.instabug.library.internal.module.InstabugLocale;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.InstabugInvocationMode;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import java.util.Locale;
import java.util.HashMap;
import android.net.Uri;
import java.util.Map;


public class RNInstabugReactnativeModule extends ReactContextBaseJavaModule {

  private Instabug mInstabug;
  private InstabugInvocationEvent invocationEvent;

  public RNInstabugReactnativeModule(ReactApplicationContext reactContext,Instabug mInstabug) {
    super(reactContext);
    this.mInstabug = mInstabug;
  }

  @Override
  public String getName() {
    return "Instabug";
  }

  /**
     * invoke sdk manually
     *
     * @param tags
     */
    @ReactMethod
    public void invoke()
    {
         mInstabug.invoke();
    }

  /**
     * Adds tag(s) to issues before sending them
     *
     * @param tags
     */
    @ReactMethod
    public void addTags(String tags) {
        try {
            String[] result = tags.split(",");
            mInstabug.resetTags(); //clear last commit tags
            mInstabug.addTags(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Change Locale of Instabug UI elements(defaults to English)
     *
     * @param languageTag
     */
    @ReactMethod
    public void changeLocale(String languageTag) {
        try {
            switch (languageTag) {
                case "CHINA":
                case "CHINESE":
                case "PRC":
                case "SIMPLIFIED_CHINESE":
                    mInstabug.changeLocale(Locale.CHINESE);
                    break;
                case "TAIWAN":
                case "TRADITIONAL_CHINESE":
                    mInstabug.changeLocale(Locale.TAIWAN);
                    break;
                case "ENGLISH":
                    mInstabug.changeLocale(Locale.ENGLISH);
                    break;
                case "UK":
                    mInstabug.changeLocale(Locale.UK);
                    break;
                case "US":
                    mInstabug.changeLocale(Locale.US);
                    break;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void report(String value) {
        InstabugInvocationMode mode = InstabugInvocationMode.PROMPT_OPTION;
        if (value.equals("bug")) {
            mode = InstabugInvocationMode.NEW_BUG;
        } else if (value.equals("feedback")) {
            mode = InstabugInvocationMode.NEW_FEEDBACK;
        }

        mInstabug.invoke(mode);
    }

    /**
     * The file at filePath will be uploaded along upcoming reports with the name fileNameWithExtension
     *
     * @param fileUri
     * @param fileNameWithExtension
     */
    @ReactMethod
    public void setFileAttachment(String fileUri, String fileNameWithExtension) {
        try {
            Uri uri = Uri.parse(fileUri);
            mInstabug.setFileAttachment(uri, fileNameWithExtension);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * If your app already acquires the user's email address and you provide it to this method,
     * Instabug will pre-fill the user email in reports.
     *
     * @param userEmail
     */
    @ReactMethod
    public void setUserEmail(String userEmail) {
        try {
            mInstabug.setUserEmail(userEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets the user name that is used in the dashboard's contacts.
     *
     * @param username
     */
    @ReactMethod
    public void setUsername(String username) {
        try {
            mInstabug.setUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Adds specific user data that you need to be added to the reports
     *
     * @param userData
     */
    @ReactMethod
    public void setUserData(String userData) {
        try {
            mInstabug.setUserData(userData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Call this method to display the discovery dialog explaining the shake gesture or the two
     * finger swipe gesture, if you've enabled it.
     * i.e: This method is automatically called on first run of the application
     */
    @ReactMethod
    public void showIntroMessage() {
        try {
            mInstabug.showIntroMessage();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }
}