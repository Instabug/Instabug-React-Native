
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
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
     */
    @ReactMethod
    public void invoke()
    {
        try {
          mInstabug.invoke();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

  /**
     * invoke sdk manually with desire invocation mode 
     *
     * @param invocation mode
     */
    @ReactMethod
    public void invokeWithInvocationMode(String invocationMode)
    {
        InstabugInvocationMode mode = InstabugInvocationMode.PROMPT_OPTION;
        if (invocationMode.equals("bug")) {
            mode = InstabugInvocationMode.NEW_BUG;
        } else if (invocationMode.equals("feedback")) {
            mode = InstabugInvocationMode.NEW_FEEDBACK;
        }else if (invocationMode.equals("chat")){
            mode = InstabugInvocationMode.NEW_CHAT;
        }else if (invocationMode.equals("chats")){
            mode = InstabugInvocationMode.CHATS_LIST;
        }else {
            mode = InstabugInvocationMode.PROMPT_OPTION;
        }
        
      try {
          mInstabug.invoke(mode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }


  /**
     * Dismisses all visible Instabug views
     *
     */
    @ReactMethod
    public void dismiss()
    {
        try {
              mInstabug.dismiss();
        } catch (Exception e) {
            e.printStackTrace();
        }
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
    public void changeLocale(Locale languageTag) {
        try {
            mInstabug.changeLocale(languageTag);
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    /** Set the primary color that the SDK will use to tint certain UI elements in the SDK
     *
     * @param primaryColorValue The value of the primary color ,
     * whatever this color was parsed from a resource color or hex color or RGB color values
     */
    @ReactMethod
    public void setPrimaryColor(int primaryColor) {
        try{
            mInstabug.setPrimaryColor(primaryColor);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Appends a log message to Instabug internal log
     * <p>
     * These logs are then sent along the next uploaded report. All log messages are timestamped <br/>
     * Logs aren't cleared per single application run. If you wish to reset the logs, use {@link #clearLog()}
     * </p>
     * Note: logs passed to this method are <b>NOT</b> printed to Logcat
     *
     * @param message log message
     */
    @ReactMethod
    public void log(String message) {
        try {
            mInstabug.log(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @return all tags added using {@link #addTags(String...)}
     * @see #resetTags()
     */
    @ReactMethod
    public ArrayList<String> getTags() {
        ArrayList<String>  tags = new  ArrayList<String>();
        try {
            tags=mInstabug.getTags();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tags;
    }

    /**
     * Reset ALL tags added using {@link #addTags(String...)}
     *
     */
    @ReactMethod
    public void resetTags() {
        try {
            mInstabug.resetTags();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @return {@code true} if Instabug is enabled, {@code false} if it's disabled
     * @see #enable()
     * @see #disable()
     */
    @ReactMethod
    public boolean isEnabled() {
        boolean isEnabled=false;
        try {
            isEnabled=mInstabug.isEnabled();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isEnabled;
    }


    /**
     * Enables all Instabug functionality
     *
     */
    @ReactMethod
    public void enable() {
        try {
            mInstabug.enable();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Disables all Instabug functionality
     *
     */
    @ReactMethod
    public void disable() {
        try {
            mInstabug.disable();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @return application token 
     */
    @ReactMethod
    public String getAppToken() {
        String appToken="";
        try {
           appToken = mInstabug.getAppToken();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return appToken;
    }


    /**
     * Get current unread count of messages for this user
     *
     * @return number of messages that are unread for this user
     */
    @ReactMethod
    public int getUnreadMessagesCount() {
        int unreadMessages = 0 ;
        try {
           unreadMessages = mInstabug.getUnreadMessagesCount();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return unreadMessages;
    }

    /**
     * Changes the event used to invoke Instabug SDK
     *
     * @param instabugInvocationEvent to be used to invoke SDK
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void changeInvocationEvent(String invocationEventValue) {
        InstabugInvocationEvent invocationEvent=InstabugInvocationEvent.FLOATING_BUTTON;
        try {
                        //setting invocation event
            if(invocationEventValue.equals("button")) {
                invocationEvent=InstabugInvocationEvent.FLOATING_BUTTON;
            } else if(invocationEventValue.equals("swipe")) {
                invocationEvent=InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT;

            } else if(invocationEventValue.equals("shake")) {
                invocationEvent=InstabugInvocationEvent.SHAKE;

            } else if(invocationEventValue.equals("screenshot")){
                invocationEvent=InstabugInvocationEvent.SCREENSHOT_GESTURE;

            } else if(invocationEventValue.equals("none")) {
                invocationEvent=InstabugInvocationEvent.NONE;
            } 
           mInstabug.changeInvocationEvent(invocationEvent);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }

    /**
     * Enabled/disable chat notification
     *
     * @param isChatNotificationEnable whether chat notification is reburied or not
     */
    @ReactMethod 
    public void setChatNotificationEnabled(boolean isChatNotificationEnable) {
        try {
           mInstabug.setChatNotificationEnabled(isChatNotificationEnable);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Enable/Disable debug logs from Instabug SDK
     * Default state: disabled
     *
     * @param isDebugEnabled whether debug logs should be printed or not into LogCat
     */
    @ReactMethod
    public void setDebugEnabled(boolean isDebugEnabled) {
        try {
           mInstabug.setDebugEnabled(isDebugEnabled);
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