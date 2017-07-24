package com.instabug.reactlibrary;

import android.app.Application;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Callback;

import com.instabug.library.Instabug;
import com.instabug.library.internal.module.InstabugLocale;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.InstabugInvocationMode;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.logging.InstabugLog;
import com.instabug.library.bugreporting.model.ReportCategory;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.user.UserEventParam;
import com.instabug.library.OnSdkDismissedCallback;
import com.instabug.library.bugreporting.model.Bug;
import com.instabug.survey.InstabugSurvey;

import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.MapUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;


/**
 * The type Rn instabug reactnative module.
 */
public class RNInstabugReactnativeModule extends ReactContextBaseJavaModule {

    //InvocationEvents
    private final String INVOCATION_EVENT_NONE = "none";
    private final String INVOCATION_EVENT_SHAKE = "shake";
    private final String INVOCATION_EVENT_SCREENSHOT = "screenshot";
    private final String INVOCATION_EVENT_TWO_FINGERS_SWIPE = "swipe";
    private final String INVOCATION_EVENT_FLOATING_BUTTON = "button";
    //InvocationModes
    private final String INVOCATION_MODE_NEW_BUG = "bug";
    private final String INVOCATION_MODE_NEW_FEEDBACK = "feedback";
    private final String INVOCATION_MODE_NEW_CHAT = "chat";
    private final String INVOCATION_MODE_CHATS_LIST = "chats";
    //FloatingButtonEdge
    private final String FLOATING_BUTTON_EDGE_RIGHT = "right";
    private final String FLOATING_BUTTON_EDGE_LEFT = "left";
    //locales
    private final String LOCALE_ARABIC = "arabic";
    private final String LOCALE_CHINESE_SIMPLIFIED = "chinesesimplified";
    private final String LOCALE_CHINESE_TRADITIONAL = "chinesetraditional";
    private final String LOCALE_CZECH = "czech";
    private final String LOCALE_ENGLISH = "english";
    private final String LOCALE_FRENCH = "french";
    private final String LOCALE_GERMAN = "german";
    private final String LOCALE_KOREAN = "korean";
    private final String LOCALE_ITALIAN = "italian";
    private final String LOCALE_JAPANESE = "japanese";
    private final String LOCALE_POLISH = "polish";
    private final String LOCALE_PORTUGUESE_BRAZIL = "portuguesebrazil";
    private final String LOCALE_RUSSIAN = "russian";
    private final String LOCALE_SPANISH = "spanish";
    private final String LOCALE_SWEDISH = "swedish";
    private final String LOCALE_TURKISH = "turkish";

    //Theme colors
    private final String COLOR_THEME_LIGHT = "light";
    private final String COLOR_THEME_DARK = "dark";

    //CustomTextPlaceHolders
    private final String SHAKE_HINT = "shakeHint";
    private final String SWIPE_HINT = "swipeHint";
    private final String INVALID_EMAIL_MESSAGE = "invalidEmailMessage";
    private final String INVALID_COMMENT_MESSAGE = "invalidCommentMessage";
    private final String EMAIL_FIELD_HINT = "emailFieldHint";
    private final String COMMENT_FIELD_HINT_FOR_BUG_REPORT = "commentFieldHintForBugReport";
    private final String COMMENT_FIELD_HINT_FOR_FEEDBACK = "commentFieldHintForFeedback";

    private final String INVOCATION_HEADER = "invocationHeader";
    private final String START_CHATS = "talkToUs";
    private final String REPORT_BUG = "reportBug";
    private final String REPORT_FEEDBACK = "reportFeedback";

    private final String CONVERSATIONS_LIST_TITLE = "conversationsHeaderTitle";

    private final String ADD_VOICE_MESSAGE = "addVoiceMessage";
    private final String ADD_IMAGE_FROM_GALLERY = "addImageFromGallery";
    private final String ADD_EXTRA_SCREENSHOT = "addExtraScreenshot";
    private final String ADD_VIDEO = "addVideoMessage";

    private final String AUDIO_RECORDING_PERMISSION_DENIED =
            "audioRecordingPermissionDeniedMessage";

    private final String VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD = "recordingMessageToHoldText";
    private final String VOICE_MESSAGE_RELEASE_TO_ATTACH = "recordingMessageToReleaseText";

    private final String REPORT_SUCCESSFULLY_SENT = "thankYouText";
    private final String VIDEO_PLAYER_TITLE = "video";

    private final String CONVERSATION_TEXT_FIELD_HINT = "conversationTextFieldHint";

    private Application androidApplication;
    private Instabug mInstabug;
    private InstabugInvocationEvent invocationEvent;
    private InstabugCustomTextPlaceHolder placeHolders;

    /**
     * Instantiates a new Rn instabug reactnative module.
     *
     * @param reactContext the react context
     * @param mInstabug    the m instabug
     */
    public RNInstabugReactnativeModule(ReactApplicationContext reactContext, Application
            androidApplication, Instabug mInstabug) {
        super(reactContext);
        this.androidApplication = androidApplication;
        this.mInstabug = mInstabug;
        //init placHolders
        placeHolders = new InstabugCustomTextPlaceHolder();
    }

    @Override
    public String getName() {
        return "Instabug";
    }

    @ReactMethod
    public void startWithToken(String androidToken, String invocationEvent) {
        mInstabug = new Instabug.Builder(this.androidApplication, androidToken)
                .setIntroMessageEnabled(false)
                .setInvocationEvent(getInvocationEventById(invocationEvent))
                .build();
        //init placHolders
        placeHolders = new InstabugCustomTextPlaceHolder();

    }

    /**
     * invoke sdk manually
     */
    @ReactMethod
    public void invoke() {
        try {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.post(new Runnable() {
                @Override
                public void run() {
                    mInstabug.invoke();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * invoke sdk manually with desire invocation mode
     *
     * @param invocationMode the invocation mode
     */
    @ReactMethod
    public void invokeWithInvocationMode(String invocationMode) {
        InstabugInvocationMode mode;

        if (invocationMode.equals(INVOCATION_MODE_NEW_BUG)) {
            mode = InstabugInvocationMode.NEW_BUG;
        } else if (invocationMode.equals(INVOCATION_MODE_NEW_FEEDBACK)) {
            mode = InstabugInvocationMode.NEW_FEEDBACK;
        } else if (invocationMode.equals(INVOCATION_MODE_NEW_CHAT)) {
            mode = InstabugInvocationMode.NEW_CHAT;
        } else if (invocationMode.equals(INVOCATION_MODE_CHATS_LIST)) {
            mode = InstabugInvocationMode.CHATS_LIST;
        } else {
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
     */
    @ReactMethod
    public void dismiss() {
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
    public void appendTags(String tags) {
        try {
            String[] result = tags.split(",");
            mInstabug.addTags(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Change Locale of Instabug UI elements(defaults to English)
     *
     * @param String instabugLocale
     */
    @ReactMethod
    public void changeLocale(String instabugLocale) {
        try {
            mInstabug.changeLocale(getLocaleByKey(instabugLocale));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * The file at filePath will be uploaded along upcoming reports with the name
     * fileNameWithExtension
     *
     * @param fileUri               the file uri
     * @param fileNameWithExtension the file name with extension
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
     * @param userEmail the user email
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
     * @param username the username
     */
    @ReactMethod
    public void setUserName(String username) {
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

    /**
     * Set the primary color that the SDK will use to tint certain UI elements in the SDK
     *
     * @param primaryColorValue The value of the primary color ,
     *                          whatever this color was parsed from a resource color or hex color
     *                          or RGB color values
     */
    @ReactMethod
    public void setPrimaryColor(int primaryColor) {
        try {
            mInstabug.setPrimaryColor(primaryColor);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
     *
     * @param {boolean} screenShot A boolean to enable or disable screenshot attachments.
     * @param {boolean} extraScreenShot A boolean to enable or disable extra screenshot attachments.
     * @param {boolean} galleryImage A boolean to enable or disable gallery image attachments.
     * @param {boolean} voiceNote A boolean to enable or disable voice note attachments.
     * @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
     */
    @ReactMethod
    public void setAttachmentTypesEnabled(boolean screenshot, boolean extraScreenshot, boolean
            galleryImage, boolean voiceNote, boolean screenRecording) {
        try {
            mInstabug.setAttachmentTypesEnabled(screenshot, extraScreenshot, galleryImage,
                    voiceNote, screenRecording);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Appends a log message to Instabug internal log
     * <p>
     * These logs are then sent along the next uploaded report. All log messages are timestamped
     * <br/>
     * Logs aren't cleared per single application run. If you wish to reset the logs, use
     * {@link #clearLog()}
     * </p>
     * Note: logs passed to this method are <b>NOT</b> printed to Logcat
     *
     * @param message log message
     */
    @ReactMethod
    public void IBGLog(String message) {
        try {
            mInstabug.log(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Gets tags.
     *
     * @return all tags added using {@link #addTags(String...)}
     * @see #resetTags()
     */
    @ReactMethod
    public void getTags(Callback tagsCallback) {
        WritableArray tagsArray;
        try {
            ArrayList<String> tags = mInstabug.getTags();
            tagsArray = new WritableNativeArray();
            for (int i = 0; i < tags.size(); i++) {
                tagsArray.pushString(tags.get(i));
            }
            tagsCallback.invoke(tagsArray);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set the user identity.
     * Instabug will pre-fill the user email in reports.
     *
     * @param username Username.
     * @param email    User's default email
     */
    @ReactMethod
    public void identifyUser(String userName, String userEmail) {
        try {
            mInstabug.identifyUser(userName, userEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Reset ALL tags added using {@link #addTags(String...)}
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
     * Is enabled boolean.
     *
     * @return {@code true} if Instabug is enabled, {@code false} if it's disabled
     * @see #enable()
     * @see #disable()
     */
    @ReactMethod
    public boolean isEnabled() {
        boolean isEnabled = false;
        try {
            isEnabled = mInstabug.isEnabled();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isEnabled;
    }


    /**
     * Enables all Instabug functionality
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
        String appToken = "";
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
    public void getUnreadMessagesCount(Callback messageCountCallback) {
        int unreadMessages = 0;
        try {
            unreadMessages = mInstabug.getUnreadMessagesCount();
        } catch (Exception e) {
            e.printStackTrace();
        }

        messageCountCallback.invoke(unreadMessages);
    }

    /**
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationEventValue the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationEvent(String invocationEventValue) {
        try {
            mInstabug.changeInvocationEvent(getInvocationEventById(invocationEventValue));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private InstabugInvocationEvent getInvocationEventById(String invocationEventValue) {
        InstabugInvocationEvent invocationEvent = InstabugInvocationEvent.SHAKE;
        try {
            if (invocationEventValue.equals(INVOCATION_EVENT_FLOATING_BUTTON)) {
                invocationEvent = InstabugInvocationEvent.FLOATING_BUTTON;
            } else if (invocationEventValue.equals(INVOCATION_EVENT_TWO_FINGERS_SWIPE)) {
                invocationEvent = InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT;
            } else if (invocationEventValue.equals(INVOCATION_EVENT_SHAKE)) {
                invocationEvent = InstabugInvocationEvent.SHAKE;
            } else if (invocationEventValue.equals(INVOCATION_EVENT_SCREENSHOT)) {
                invocationEvent = InstabugInvocationEvent.SCREENSHOT_GESTURE;
            } else if (invocationEventValue.equals(INVOCATION_EVENT_NONE)) {
                invocationEvent = InstabugInvocationEvent.NONE;
            }

            return invocationEvent;
        } catch (Exception e) {
            e.printStackTrace();
            return invocationEvent;
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

    /**
     * Report a caught exception to Instabug dashboard
     *
     * @param throwable the exception to be reported
     */
    @ReactMethod
    public void reportJsException(ReadableArray stack, String message, String errorIdentifier) {
        try {
            int size = stack != null ? stack.size() : 0;
            StackTraceElement[] stackTraceElements = new StackTraceElement[size];
            for (int i = 0; i < size; i++) {
                ReadableMap frame = stack.getMap(i);
                String methodName = frame.getString("methodName");
                String fileName = frame.getString("file");
                int lineNumber = frame.getInt("lineNumber");

                stackTraceElements[i] = new StackTraceElement(fileName, methodName, fileName,
                        lineNumber);
            }
            Throwable throwable = new Throwable(message);
            throwable.setStackTrace(stackTraceElements);
            if (errorIdentifier != null)
                mInstabug.reportException(throwable);
            else
                mInstabug.reportException(throwable, errorIdentifier);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Appends a log message to Instabug internal log
     * <p>
     * These logs are then sent along the next uploaded report.
     * All log messages are timestamped <br/>
     * Logs aren't cleared per single application run. If you wish to reset the logs,
     * use {@link #clearLogs()} ()}
     * </p>
     * Note: logs passed to this method are <b>NOT</b> printed to Logcat
     *
     * @param logMessage The message you would like logged
     * @param level      the level
     * @param message    the message
     */
    @ReactMethod
    public void log(String level, String message) {
        try {
            switch (level) {
                case "v":
                    InstabugLog.v(message);
                    break;
                case "i":
                    InstabugLog.i(message);
                    break;
                case "d":
                    InstabugLog.d(message);
                    break;
                case "e":
                    InstabugLog.e(message);
                    break;
                case "w":
                    InstabugLog.w(message);
                    break;
                case "wtf":
                    InstabugLog.wtf(message);
                    break;
                default:
                    InstabugLog.d(message);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Clears Instabug internal log
     */
    @ReactMethod
    public void clearLogs() {
        try {
            InstabugLog.clearLogs();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
     *
     * @param key   the attribute
     * @param value the value
     */
    @ReactMethod
    public void setUserAttribute(String key, String value) {
        try {
            mInstabug.setUserAttribute(key, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Gets specific user attribute.
     *
     * @param key the attribute key as string
     * @return the desired user attribute
     */
    @ReactMethod
    public void getUserAttribute(String key, Callback userAttributeCallback) {
        String userAttribute;
        try {
            userAttribute = mInstabug.getUserAttribute(key);
            userAttributeCallback.invoke(userAttribute);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Removes user attribute if exists.
     *
     * @param key the attribute key as string
     * @see #setUserAttribute(String, String)
     */
    @ReactMethod
    public void removeUserAttribute(String key) {
        try {
            mInstabug.removeUserAttribute(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Gets all saved user attributes.
     *
     * @return all user attributes as HashMap<String, String>
     */
    @ReactMethod
    public void getAllUserAttributes(Callback userAttributesCallback) {
        WritableMap writableMap = new WritableNativeMap();
        try {
            HashMap<String, String> map = mInstabug.getAllUserAttributes();
            for (HashMap.Entry<String, String> entry : map.entrySet()) {
                writableMap.putString(entry.getKey(), entry.getValue());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        userAttributesCallback.invoke(writableMap);
    }

    /**
     * Clears all user attributes if exists.
     */
    @ReactMethod
    public void clearAllUserAttributes() {
        try {
            mInstabug.clearAllUserAttributes();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets InstabugSDK theme color.
     *
     * @param theme which is a constant String "light" or "dark"
     */
    @ReactMethod
    public void setColorTheme(String theme) {
        try {
            if (theme.equals(COLOR_THEME_LIGHT)) {
                mInstabug.setTheme(InstabugColorTheme.InstabugColorThemeLight);

            } else if (theme.equals(COLOR_THEME_DARK)) {
                mInstabug.setTheme(InstabugColorTheme.InstabugColorThemeDark);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Allows you to show a predefined set of categories for users to choose
     * from when reporting a bug or sending feedback. Selected category
     * shows up on your Instabug dashboard as a tag to make filtering
     * through issues easier.
     *
     * @param reportCategories the report categories list which is a list of ReportCategory model
     */
    @ReactMethod
    public void setReportCategories(ReadableArray categoriesTitles) {
        try {
            ArrayList<ReportCategory> bugCategories = new ArrayList<>();
            int size = categoriesTitles != null ? categoriesTitles.size() : 0;
            if (size == 0) return;
            for (int i = 0; i < size; i++) {
                bugCategories.add(ReportCategory.getInstance().withLabel(categoriesTitles
                        .getString(i)));
            }

            Instabug.setReportCategories(bugCategories);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets whether users are required to enter an email address or not when
     * sending reports.
     * Defaults to YES.
     *
     * @param {boolean} isEmailFieldRequired A boolean to indicate whether email
     *                  field is required or not.
     */
    @ReactMethod
    public void setEmailFieldRequired(boolean isEmailFieldRequired) {
        try {
            mInstabug.setEmailFieldRequired(isEmailFieldRequired);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets whether users are required to enter a comment or not when sending reports.
     * Defaults to NO.
     *
     * @param {boolean} isCommentFieldRequired A boolean to indicate whether comment
     *                  field is required or not.
     */
    @ReactMethod
    public void setCommentFieldRequired(boolean isCommentFieldRequired) {
        try {
            mInstabug.setCommentFieldRequired(isCommentFieldRequired);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Overrides any of the strings shown in the SDK with custom ones.
     * Allows you to customize any of the strings shown to users in the SDK.
     *
     * @param {string}  string String value to override the default one.
     * @param {strings} key Key of string to override.
     */
    @ReactMethod
    public void setStringToKey(String string, String key) {
        try {
            placeHolders.set(getStringToKeyConstant(key), string);
            Instabug.setCustomTextPlaceHolders(placeHolders);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets the default value of the user's email to null and show email field and remove user
     * name from all reports
     * It also reset the chats on device and removes user attributes, user data and completed
     * surveys.
     */
    @ReactMethod
    public void logOut() {
        try {
            mInstabug.logoutUser();
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Enables/disables screenshot view when reporting a bug/improvement.
     * By default, screenshot view is shown when reporting a bug, but not when
     * sending feedback.
     *
     * @param {boolean} willSkipScreenshotAnnotation sets whether screenshot view is
     *                  shown or not. Passing YES will show screenshot view for both feedback and
     *                  bug reporting, while passing NO will disable it for both.
     */
    @ReactMethod
    public void setWillSkipScreenshotAnnotation(boolean willSkipScreenshotAnnotation) {
        try {
            mInstabug.setWillSkipScreenshotAnnotation(willSkipScreenshotAnnotation);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Logs a user event that happens through the lifecycle of the application.
     * Logged user events are going to be sent with each report, as well as at the end of a session.
     *
     * @param {string} name Event name.
     */
    @ReactMethod
    public void logUserEventWithName(String name) {
        try {
            mInstabug.logUserEvent(name);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Logs a user event that happens through the lifecycle of the application.
     * Logged user events are going to be sent with each report, as well as at the end of a
     * session.
     *
     * @param {string}      name Event name.
     * @param {ReadableMap} params An optional ReadableMap to be associated with the event.
     */
    @ReactMethod
    public void logUserEventWithNameAndParams(String name, ReadableMap params) {
        try {
            Map<String, Object> paramsMap = MapUtil.toMap(params);
            UserEventParam[] userEventParams = new UserEventParam[paramsMap.size()];
            int index = 0;
            UserEventParam userEventParam;
            for (Map.Entry<String, Object> entry : paramsMap.entrySet()) {
                userEventParam = new UserEventParam().setKey(entry.getKey())
                        .setValue((entry.getValue()).toString());
                userEventParams[index] = userEventParam;
                index++;
            }

            mInstabug.logUserEvent(name, userEventParams);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets a block of code to be executed just before the SDK's UI is presented.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes before the SDK's UI is shown.
     *
     * @param {preInvocationHandler} preInvocationHandler - A callback that gets executed before
     *                               invoking the SDK
     */
    @ReactMethod
    public void setPreInvocationHandler(final Callback preInvocationHandler) {
        try {
            Runnable preInvocationRunnable = new Runnable() {
                @Override
                public void run() {
                    preInvocationHandler.invoke();
                }
            };
            mInstabug.setPreInvocation(preInvocationRunnable);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets a block of code to be executed before sending each report.
     * This block is executed in the background before sending each report. Could
     * be used for attaching logs and extra data to reports.
     *
     * @param {preSendingHandler} preSendingHandler - A callback that gets executed before
     *                            sending each bug
     *                            report.
     */
    @ReactMethod
    public void setPreSendingHandler(final Callback preSendingHandler) {
        try {
            Runnable preSendingRunnable = new Runnable() {
                @Override
                public void run() {
                    preSendingHandler.invoke();
                }
            };
            mInstabug.setPreSendingRunnable(preSendingRunnable);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets a block of code to be executed right after the SDK's UI is dismissed.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes after the SDK's UI is dismissed.
     *
     * @param {postInvocationHandler} postInvocationHandler - A callback to get executed after
     *                                dismissing the SDK.
     */
    @ReactMethod
    public void setPostInvocationHandler(final Callback postInvocationHandler) {
        try {

            mInstabug.setOnSdkDismissedCallback(new OnSdkDismissedCallback() {
                @Override
                public void onSdkDismissed(DismissType issueState, Bug.Type bugType) {
                    postInvocationHandler.invoke();
                }
            });

        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Show any valid survey if exist
     *
     * @return return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void showSurveysIfAvailable() {
        try {
            mInstabug.showValidSurvey();
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Show any valid survey if exist
     *
     * @return return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void setSurveysEnabled(boolean surveysEnabled) {
        try {
            InstabugSurvey.setSurveysAutoShowing(surveysEnabled);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets the default value of the intro message guide that gets shown on launching the app
     *
     * @param enabled true to show intro message guide
     */
    @ReactMethod
    public void setIntroMessageEnabled(boolean enabled) {
        try {
            mInstabug.setIntroMessageEnabled(enabled);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Sets the runnable that gets executed just before showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param preShowingSurveyRunnable to run on the UI thread before showing any valid survey
     */
    @ReactMethod
    public void setWillShowSurveyHandler(final Callback willShowSurveyHandler) {
        try {
            Runnable willShowSurveyRunnable = new Runnable() {
                @Override
                public void run() {
                    willShowSurveyHandler.invoke();
                }
            };
            mInstabug.setPreShowingSurveyRunnable(willShowSurveyRunnable);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets the runnable that gets executed just after showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param afterShowingSurveyRunnable to run on the UI thread after showing any valid survey
     */
    @ReactMethod
    public void setDidDismissSurveyHandler(final Callback didDismissSurveyHandler) {
        try {
            Runnable didDismissSurveyRunnable = new Runnable() {
                @Override
                public void run() {
                    didDismissSurveyHandler.invoke();
                }
            };
            mInstabug.setAfterShowingSurveyRunnable(didDismissSurveyRunnable);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Enable/Disable prompt options when SDK invoked. When only a single option is enabled it
     * becomes the default
     * invocation option that SDK gets invoked with and prompt options screen will not show. When
     * none is enabled, Bug
     * reporting becomes the default invocation option.
     *
     * @param {boolean} chat      weather Talk to us is enable or not
     * @param {boolean} bug       weather Report a Problem is enable or not
     * @param {boolean} feedback  weather General Feedback  is enable or not
     */
    @ReactMethod
    public void setPromptOptionsEnabled(boolean chat, boolean bug, boolean feedback) {
        try {
            mInstabug.setPromptOptionsEnabled(chat, bug, feedback);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Clears all Uris of the attached files.
     * The URIs which added via {@link Instabug#addFileAttachment} API not the physical files.
     */
    @ReactMethod
    public void clearFileAttachment() {
        try {
            mInstabug.clearFileAttachment();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets the threshold value of the shake gesture for android devices.
     * Default for android is an integer value equals 350.
     * you could increase the shaking difficulty level by
     * increasing the `350` value and vice versa.
     *
     * @param {number} androidThreshold Threshold for android devices.
     */
    @ReactMethod
    public void setShakingThresholdForAndroid(int androidThreshold) {
        try {
            mInstabug.setShakingThreshold(androidThreshold);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets a block of code that gets executed when a new message is received.
     *
     * @param {onNewMessageHandler} onNewMessageHandler - A callback that gets
     *                              executed when a new message is received.
     */
    @ReactMethod
    public void setOnNewMessageHandler(final Callback onNewMessageHandler) {
        try {
            Runnable onNewMessageRunnable = new Runnable() {
                @Override
                public void run() {
                    onNewMessageHandler.invoke();
                }
            };
            mInstabug.setNewMessageHandler(onNewMessageRunnable);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    private InstabugCustomTextPlaceHolder.Key getStringToKeyConstant(String key) {
        switch (key) {
            case SHAKE_HINT:
                return InstabugCustomTextPlaceHolder.Key.SHAKE_HINT;
            case SWIPE_HINT:
                return InstabugCustomTextPlaceHolder.Key.SWIPE_HINT;
            case INVALID_EMAIL_MESSAGE:
                return InstabugCustomTextPlaceHolder.Key.INVALID_EMAIL_MESSAGE;
            case INVALID_COMMENT_MESSAGE:
                return InstabugCustomTextPlaceHolder.Key.INVALID_COMMENT_MESSAGE;
            case EMAIL_FIELD_HINT:
                return InstabugCustomTextPlaceHolder.Key.EMAIL_FIELD_HINT;
            case COMMENT_FIELD_HINT_FOR_BUG_REPORT:
                return InstabugCustomTextPlaceHolder.Key.COMMENT_FIELD_HINT_FOR_BUG_REPORT;
            case COMMENT_FIELD_HINT_FOR_FEEDBACK:
                return InstabugCustomTextPlaceHolder.Key.COMMENT_FIELD_HINT_FOR_FEEDBACK;
            case INVOCATION_HEADER:
                return InstabugCustomTextPlaceHolder.Key.INVOCATION_HEADER;
            case START_CHATS:
                return InstabugCustomTextPlaceHolder.Key.START_CHATS;
            case REPORT_BUG:
                return InstabugCustomTextPlaceHolder.Key.REPORT_BUG;
            case REPORT_FEEDBACK:
                return InstabugCustomTextPlaceHolder.Key.REPORT_FEEDBACK;
            case CONVERSATIONS_LIST_TITLE:
                return InstabugCustomTextPlaceHolder.Key.CONVERSATIONS_LIST_TITLE;
            case ADD_VOICE_MESSAGE:
                return InstabugCustomTextPlaceHolder.Key.ADD_VOICE_MESSAGE;
            case ADD_IMAGE_FROM_GALLERY:
                return InstabugCustomTextPlaceHolder.Key.ADD_IMAGE_FROM_GALLERY;
            case ADD_EXTRA_SCREENSHOT:
                return InstabugCustomTextPlaceHolder.Key.ADD_EXTRA_SCREENSHOT;
            case ADD_VIDEO:
                return InstabugCustomTextPlaceHolder.Key.ADD_VIDEO;
            case AUDIO_RECORDING_PERMISSION_DENIED:
                return InstabugCustomTextPlaceHolder.Key.AUDIO_RECORDING_PERMISSION_DENIED;
            case VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD:
                return InstabugCustomTextPlaceHolder.Key.VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD;
            case VOICE_MESSAGE_RELEASE_TO_ATTACH:
                return InstabugCustomTextPlaceHolder.Key.VOICE_MESSAGE_RELEASE_TO_ATTACH;
            case CONVERSATION_TEXT_FIELD_HINT:
                return InstabugCustomTextPlaceHolder.Key.CONVERSATION_TEXT_FIELD_HINT;
            case REPORT_SUCCESSFULLY_SENT:
                return InstabugCustomTextPlaceHolder.Key.REPORT_SUCCESSFULLY_SENT;
            case VIDEO_PLAYER_TITLE:
                return InstabugCustomTextPlaceHolder.Key.VIDEO_PLAYER_TITLE;
            default:
                return null;
        }
    }

    private Locale getLocaleByKey(String instabugLocale) {
        String localeInLowerCase = instabugLocale.toLowerCase();
        switch (localeInLowerCase) {
            case LOCALE_ARABIC:
                return new Locale(InstabugLocale.ARABIC.getCode(), InstabugLocale.ARABIC
                        .getCountry());
            case LOCALE_ENGLISH:
                return new Locale(InstabugLocale.ENGLISH.getCode(), InstabugLocale.ENGLISH
                        .getCountry());
            case LOCALE_CZECH:
                return new Locale(InstabugLocale.CZECH.getCode(), InstabugLocale.CZECH.getCountry
                        ());
            case LOCALE_FRENCH:
                return new Locale(InstabugLocale.FRENCH.getCode(), InstabugLocale.FRENCH
                        .getCountry());
            case LOCALE_GERMAN:
                return new Locale(InstabugLocale.GERMAN.getCode(), InstabugLocale.GERMAN
                        .getCountry());
            case LOCALE_ITALIAN:
                return new Locale(InstabugLocale.ITALIAN.getCode(), InstabugLocale.ITALIAN
                        .getCountry());
            case LOCALE_JAPANESE:
                return new Locale(InstabugLocale.JAPANESE.getCode(), InstabugLocale.JAPANESE
                        .getCountry());
            case LOCALE_POLISH:
                return new Locale(InstabugLocale.POLISH.getCode(), InstabugLocale.POLISH
                        .getCountry());
            case LOCALE_RUSSIAN:
                return new Locale(InstabugLocale.RUSSIAN.getCode(), InstabugLocale.RUSSIAN
                        .getCountry());
            case LOCALE_SPANISH:
                return new Locale(InstabugLocale.SPANISH.getCode(), InstabugLocale.SPANISH
                        .getCountry());
            case LOCALE_SWEDISH:
                return new Locale(InstabugLocale.SWEDISH.getCode(), InstabugLocale.SWEDISH
                        .getCountry());
            case LOCALE_TURKISH:
                return new Locale(InstabugLocale.TURKISH.getCode(), InstabugLocale.TURKISH
                        .getCountry());
            case LOCALE_PORTUGUESE_BRAZIL:
                return new Locale(InstabugLocale.PORTUGUESE_BRAZIL.getCode(), InstabugLocale
                        .PORTUGUESE_BRAZIL.getCountry());
            case LOCALE_CHINESE_SIMPLIFIED:
                return new Locale(InstabugLocale.SIMPLIFIED_CHINESE.getCode(), InstabugLocale
                        .SIMPLIFIED_CHINESE.getCountry());
            case LOCALE_CHINESE_TRADITIONAL:
                return new Locale(InstabugLocale.TRADITIONAL_CHINESE.getCode(), InstabugLocale
                        .TRADITIONAL_CHINESE.getCountry());
            case LOCALE_KOREAN:
                return new Locale(InstabugLocale.KOREAN.getCode(), InstabugLocale.KOREAN
                        .getCountry());
            default:
                return new Locale(InstabugLocale.ENGLISH.getCode(), InstabugLocale.ENGLISH
                        .getCountry());
        }
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("invocationEventNone", INVOCATION_EVENT_NONE);
        constants.put("invocationEventShake", INVOCATION_EVENT_SHAKE);
        constants.put("invocationEventScreenshot", INVOCATION_EVENT_SCREENSHOT);
        constants.put("invocationEventTwoFingersSwipe", INVOCATION_EVENT_TWO_FINGERS_SWIPE);
        constants.put("invocationEventFloatingButton", INVOCATION_EVENT_FLOATING_BUTTON);

        constants.put("colorThemeLight", COLOR_THEME_LIGHT);
        constants.put("colorThemeDark", COLOR_THEME_DARK);

        constants.put("invocationModeNewBug", INVOCATION_MODE_NEW_BUG);
        constants.put("invocationModeNewFeedback", INVOCATION_MODE_NEW_FEEDBACK);
        constants.put("invocationModeNewChat", INVOCATION_MODE_NEW_CHAT);
        constants.put("invocationModeChatsList", INVOCATION_MODE_CHATS_LIST);

        constants.put("floatingButtonEdgeLeft",FLOATING_BUTTON_EDGE_LEFT);
        constants.put("floatingButtonEdgeRight",FLOATING_BUTTON_EDGE_RIGHT);

        constants.put("localeArabic", LOCALE_ARABIC);
        constants.put("localeChineseSimplified", LOCALE_CHINESE_SIMPLIFIED);
        constants.put("localeChineseTraditional", LOCALE_CHINESE_TRADITIONAL);
        constants.put("localeCzech", LOCALE_CZECH);
        constants.put("localeEnglish", LOCALE_ENGLISH);
        constants.put("localeFrench", LOCALE_FRENCH);
        constants.put("localeGerman", LOCALE_FRENCH);
        constants.put("localeKorean", LOCALE_KOREAN);
        constants.put("localeItalian", LOCALE_ITALIAN);
        constants.put("localeJapanese", LOCALE_JAPANESE);
        constants.put("localePolish", LOCALE_POLISH);
        constants.put("localePortugueseBrazil", LOCALE_PORTUGUESE_BRAZIL);
        constants.put("localeRussian", LOCALE_RUSSIAN);
        constants.put("localeSpanish", LOCALE_SPANISH);
        constants.put("localeSwedish", LOCALE_SWEDISH);
        constants.put("localeTurkish", LOCALE_TURKISH);

        constants.put("shakeHint", SHAKE_HINT);
        constants.put("swipeHint", SWIPE_HINT);
        constants.put("invalidEmailMessage", INVALID_EMAIL_MESSAGE);
        constants.put("invalidCommentMessage", INVALID_COMMENT_MESSAGE);
        constants.put("emailFieldHint", EMAIL_FIELD_HINT);
        constants.put("commentFieldHintForBugReport", COMMENT_FIELD_HINT_FOR_BUG_REPORT);
        constants.put("commentFieldHintForFeedback", COMMENT_FIELD_HINT_FOR_FEEDBACK);
        constants.put("invocationHeader", INVOCATION_HEADER);
        constants.put("talkToUs", START_CHATS);
        constants.put("reportBug", REPORT_BUG);
        constants.put("reportFeedback", REPORT_FEEDBACK);
        constants.put("conversationsHeaderTitle", CONVERSATIONS_LIST_TITLE);
        constants.put("addVoiceMessage", ADD_VOICE_MESSAGE);
        constants.put("addImageFromGallery", ADD_IMAGE_FROM_GALLERY);
        constants.put("addExtraScreenshot", ADD_EXTRA_SCREENSHOT);
        constants.put("addVideoMessage", ADD_VIDEO);
        constants.put("audioRecordingPermissionDeniedMessage", AUDIO_RECORDING_PERMISSION_DENIED);
        constants.put("recordingMessageToHoldText", VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD);
        constants.put("recordingMessageToReleaseText", VOICE_MESSAGE_RELEASE_TO_ATTACH);
        constants.put("thankYouText", REPORT_SUCCESSFULLY_SENT);
        constants.put("video", VIDEO_PLAYER_TITLE);
        constants.put("conversationTextFieldHint", CONVERSATION_TEXT_FIELD_HINT);


        return constants;
    }
}

