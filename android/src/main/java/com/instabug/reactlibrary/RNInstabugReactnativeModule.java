package com.instabug.reactlibrary;

import android.annotation.SuppressLint;
import android.app.Application;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.instabug.bug.BugReporting;
import com.instabug.bug.PromptOption;
import com.instabug.bug.instabugdisclaimer.Internal;
import com.instabug.bug.invocation.InvocationMode;
import com.instabug.bug.invocation.InvocationOption;
import com.instabug.chat.Chats;
import com.instabug.chat.Replies;
import com.instabug.crash.CrashReporting;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.InstabugState;
import com.instabug.library.OnSdkDismissCallback;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.OnInvokeCallback;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.library.logging.InstabugLog;
import com.instabug.library.model.NetworkLog;
import com.instabug.library.model.Report;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.visualusersteps.State;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.ReportUtil;
import com.instabug.survey.OnDismissCallback;
import com.instabug.survey.OnShowCallback;
import com.instabug.survey.Survey;
import com.instabug.survey.Surveys;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import static com.instabug.reactlibrary.utils.ArrayUtil.jsonToArray;
import static com.instabug.reactlibrary.utils.ArrayUtil.toJson;
import static com.instabug.reactlibrary.utils.ArrayUtil.toWritableArray;
import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;
import static com.instabug.reactlibrary.utils.MapUtil.toWritableMap;


/**
 * The type Rn instabug reactnative module.
 */
public class RNInstabugReactnativeModule extends ReactContextBaseJavaModule {

    private InstabugCustomTextPlaceHolder placeHolders;
    private Report currentReport;

    /**
     * Instantiates a new Rn instabug reactnative module.
     *
     * @param reactContext the react context
     * @param mInstabug    the m instabug
     */
    public RNInstabugReactnativeModule(ReactApplicationContext reactContext, Application
            androidApplication, Instabug mInstabug) {
        super(reactContext);
        //init placHolders
        placeHolders = new InstabugCustomTextPlaceHolder();
    }

    @Override
    public String getName() {
        return "Instabug";
    }


    /**
     +------------------------------------------------------------------------+
     |                            Instabug Module                             |
     +------------------------------------------------------------------------+
     */

    /**
     * Adds specific user data that you need to be added to the reports
     *
     * @param userData
     */
    @ReactMethod
    public void setUserData(String userData) {
        try {
            Instabug.setUserData(userData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Enable/disable session profiler
     *
     * @param sessionProfilerEnabled desired state of the session profiler feature
     */
    @ReactMethod
    public void setSessionProfilerEnabled(boolean sessionProfilerEnabled) {
        try {
            if (sessionProfilerEnabled) {
                Instabug.setSessionProfilerState(Feature.State.ENABLED);
            } else {
                Instabug.setSessionProfilerState(Feature.State.DISABLED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void setFloatingButtonEdge(final String floatingButtonEdge, final int floatingButtonOffset) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                BugReporting.setFloatingButtonOffset(floatingButtonOffset);
                BugReporting.setFloatingButtonEdge(ArgsRegistry.getDeserializedValue(floatingButtonEdge, InstabugFloatingButtonEdge.class));
            }
        });
    }

    /**
     * Change Locale of Instabug UI elements(defaults to English)
     *
     * @param instabugLocale
     */
    @ReactMethod
    public void setLocale(String instabugLocale) {
        try {
            Instabug.setLocale(ArgsRegistry.getDeserializedValue(instabugLocale, Locale.class));
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
            Instabug.setColorTheme(ArgsRegistry.getDeserializedValue(theme, InstabugColorTheme.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set the primary color that the SDK will use to tint certain UI elements in the SDK
     *
     * @param primaryColor The value of the primary color ,
     *                     whatever this color was parsed from a resource color or hex color
     *                     or RGB color values
     */
    @ReactMethod
    public void setPrimaryColor(final int primaryColor) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setPrimaryColor(primaryColor);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Adds tag(s) to issues before sending them
     *
     * @param tags
     */
    @ReactMethod
    public void appendTags(ReadableArray tags) {
        try {
            Object[] objectArray = ArrayUtil.toArray(tags);
            String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
            Instabug.addTags(stringArray);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Reset ALL tags added
     */
    @ReactMethod
    public void resetTags() {
        try {
            Instabug.resetTags();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Gets tags.
     *
     * @return all tags added
     * @see #resetTags()
     */
    @ReactMethod
    public void getTags(Callback tagsCallback) {
        WritableArray tagsArray;
        try {
            ArrayList<String> tags = Instabug.getTags();
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
     * Overrides any of the strings shown in the SDK with custom ones.
     * Allows you to customize any of the strings shown to users in the SDK.
     *
     * @param string String value to override the default one.
     * @param key    Key of string to override.
     */
    @ReactMethod
    public void setString(String string, String key) {
        try {
            placeHolders.set(ArgsRegistry.getDeserializedValue(key, InstabugCustomTextPlaceHolder.Key.class), string);
            Instabug.setCustomTextPlaceHolders(placeHolders);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }


    /**
     * Set the user identity.
     * Instabug will pre-fill the user email in reports.
     *
     * @param userName  Username.
     * @param userEmail User's default email
     */
    @ReactMethod
    public void identifyUserWithEmail(String userEmail, String userName) {
        try {
            Instabug.identifyUser(userName, userEmail);
        } catch (Exception e) {
            e.printStackTrace();
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
            Instabug.logoutUser();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Logs a user event that happens through the lifecycle of the application.
     * Logged user events are going to be sent with each report, as well as at the end of a session.
     *
     * @param name Event name.
     */
    @ReactMethod
    public void logUserEventWithName(String name) {
        try {
            Instabug.logUserEvent(name);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Sets whether user steps tracking is visual, non visual or disabled.
     *
     * @param reproStepsMode A string to set user steps tracking to be
     *                       enabled, non visual or disabled.
     */
    @ReactMethod
    public void setReproStepsMode(String reproStepsMode) {
        try {
            Instabug.setReproStepsState(ArgsRegistry.getDeserializedValue("repro"+reproStepsMode, State.class));
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
            Instabug.setUserAttribute(key, value);
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
        try {
            userAttributeCallback.invoke(Instabug.getUserAttribute(key));
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
            Instabug.removeUserAttribute(key);
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
            HashMap<String, String> map = Instabug.getAllUserAttributes();
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
            Instabug.clearAllUserAttributes();
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
            Instabug.setDebugEnabled(isDebugEnabled);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Enables all Instabug functionality
     */
    @ReactMethod
    public void enable() {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setState(InstabugState.ENABLED);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Disables all Instabug functionality
     */
    @ReactMethod
    public void disable() {
        try {
            Instabug.disable();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Shows the welcome message in a specific mode.
     *
     * @param welcomeMessageMode An enum to set the welcome message mode to
     *                          live, or beta.
     */
    @ReactMethod
    public void showWelcomeMessageWithMode(String welcomeMessageMode) {
        try {
            Instabug.showWelcomeMessage(ArgsRegistry.getDeserializedValue(welcomeMessageMode, WelcomeMessage.State.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Sets the welcome message mode to live, beta or disabled.
     *
     * @param welcomeMessageMode An enum to set the welcome message mode to
     *                          live, beta or disabled.
     */
    @ReactMethod
    public void setWelcomeMessageMode(String welcomeMessageMode) {
        try {
            Instabug.setWelcomeMessageState(ArgsRegistry.getDeserializedValue(welcomeMessageMode, WelcomeMessage.State.class));

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
            File file = new File(fileUri);
            if (file.exists()) {
                Instabug.addFileAttachment(Uri.fromFile(file), fileNameWithExtension);
            }
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
            Instabug.clearFileAttachment();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Hides a view from the screenshot taken
     *
     * @param ids   ReadableArray of ids of the views to be hidden
     */
    @ReactMethod
    public void hideView(final ReadableArray ids) {
        UIManagerModule uiManagerModule = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManagerModule.prependUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                final View[] arrayOfViews = new View[ids.size()];
                for (int i = 0; i < ids.size(); i++) {
                    int viewId = (int) ids.getDouble(i);
                    arrayOfViews[i] = nativeViewHierarchyManager.resolveView(viewId);
                }
                Instabug.setViewsAsPrivate(arrayOfViews);
            }
        });
    }

    /**
     * Shows default Instabug prompt.
     *
     */
    @ReactMethod
    public void show() {
        Instabug.show();
    }

    /**
     * Sets a block of code to be executed before sending each report.
     * This block is executed in the background before sending each report. Could
     * be used for attaching logs and extra data to reports.
     *
     * @param preSendingHandler - A callback that gets executed before
     *                          sending each bug
     *                          report.
     */
    @ReactMethod
    public void setPreSendingHandler(final Callback preSendingHandler) {
        Report.OnReportCreatedListener listener = new Report.OnReportCreatedListener() {
            @Override
            public void onReportCreated(Report report) {
                WritableMap reportParam = Arguments.createMap();
                reportParam.putArray("tagsArray", toWritableArray(report.getTags()));
                reportParam.putArray("consoleLogs", toWritableArray(report.getConsoleLog()));
                reportParam.putString("userData", report.getUserData());
                reportParam.putMap("userAttributes", toWritableMap(report.getUserAttributes()));
                reportParam.putMap("fileAttachments", toWritableMap(report.getFileAttachments()));
                sendEvent(getReactApplicationContext(), "IBGpreSendingHandler", reportParam);
                currentReport = report;
            }
        };

        Method method = getMethod(Instabug.class, "onReportSubmitHandler_Private", Report.OnReportCreatedListener.class);
        if (method != null) {
            try {
                method.invoke(null, listener);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Submits current report
     *
     */
    @ReactMethod
    public void submitReport() {
        Method method = getMethod(Instabug.class, "setReport", Report.class);
        if (method != null) {
            try {
                method.invoke(null, currentReport);
                currentReport = null;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
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
            isEnabled = Instabug.isEnabled();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isEnabled;
    }

    /**
     * @return application token
     */
    @ReactMethod
    public String getAppToken() {
        String appToken = "";
        try {
            appToken = Instabug.getAppToken();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return appToken;
    }

    /**
     +------------------------------------------------------------------------+
     |                            BugReporting Module                         |
     +------------------------------------------------------------------------+
     */

    /**
     * Sets whether attachments in bug reporting and in-app messaging are enabled or not.
     *
     * @param  screenshot A boolean to enable or disable screenshot attachments.
     * @param {boolean} extraScreenShot A boolean to enable or disable extra screenshot attachments.
     * @param {boolean} galleryImage A boolean to enable or disable gallery image attachments.
     * @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
     */
    @ReactMethod
    public void setEnabledAttachmentTypes(boolean screenshot, boolean extraScreenshot, boolean
            galleryImage, boolean screenRecording) {
        try {
            BugReporting.setAttachmentTypesEnabled(screenshot, extraScreenshot, galleryImage,
                    screenRecording);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets the default corner at which the video recording floating button will be shown
     *
     * @param corner corner to stick the video recording floating button to
     */
    @ReactMethod
    public void setVideoRecordingFloatingButtonPosition(String corner) {
        try {
            BugReporting.setVideoRecordingFloatingButtonPosition(ArgsRegistry.getDeserializedValue(corner, InstabugVideoRecordingButtonPosition.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Enable/disable BugReporting
     *
     * @param isEnabled desired state of the BugReporting feature
     */
    @ReactMethod
    public void setBugReportingEnabled(final boolean isEnabled) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled) {
                        BugReporting.setState(Feature.State.ENABLED);
                    } else {
                        BugReporting.setState(Feature.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }

    /**
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationEventValues the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationEvents(ReadableArray invocationEventValues) {
        try {
            Object[] objectArray = ArrayUtil.toArray(invocationEventValues);
            String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
            final InstabugInvocationEvent[] invocationEventsArray = new InstabugInvocationEvent[stringArray.length];
            for (int i = 0; i < stringArray.length; i++) {
                String key = stringArray[i];
                invocationEventsArray[i] = ArgsRegistry.getDeserializedValue(key, InstabugInvocationEvent.class);
            }
            new Handler(Looper.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    try {
                        BugReporting.setInvocationEvents(invocationEventsArray);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * invoke sdk manually with mode and options
     *
     * @param
     */
    @ReactMethod
    public void invoke() {
        try {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.post(new Runnable() {
                @Override
                public void run() {
                    BugReporting.invoke();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationOptionValues the invocation event value
     * @see InstabugInvocationEvent
     */
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setInvocationOptions(ReadableArray invocationOptionValues) {
        try {
            Object[] objectArray = ArrayUtil.toArray(invocationOptionValues);
            String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);

            int[] options = new int[stringArray.length];
            for (int i = 0; i < stringArray.length; i++) {
                options[i] = ArgsRegistry.getDeserializedValue(stringArray[i], Integer.class);
            }
            BugReporting.setOptions(options);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * invoke sdk manually with desire invocation mode
     *
     * @param invocationMode the invocation mode
     * @param invocationOptions the array of invocation options
     */
    @Deprecated
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void invokeWithInvocationModeAndOptions(String invocationMode, ReadableArray invocationOptions) {
        String INVOCATION_MODE_NEW_BUG = "bug";
        String INVOCATION_MODE_NEW_FEEDBACK = "feedback";
        String INVOCATION_MODE_NEW_CHAT = "chat";
        String INVOCATION_MODE_CHATS_LIST = "chats";

        final String EMAIL_FIELD_HIDDEN = "emailFieldHidden";
        final String EMAIL_FIELD_OPTIONAL = "emailFieldOptional";
        final String COMMENT_FIELD_REQUIRED = "commentFieldRequired";
        final String DISABLE_POST_SENDING_DIALOG = "disablePostSendingDialog";

        InvocationMode mode;
        if (invocationMode.equals(INVOCATION_MODE_NEW_BUG)) {
            mode = InvocationMode.NEW_BUG;
        } else if (invocationMode.equals(INVOCATION_MODE_NEW_FEEDBACK)) {
            mode = InvocationMode.NEW_FEEDBACK;
        } else if (invocationMode.equals(INVOCATION_MODE_NEW_CHAT)) {
            mode = InvocationMode.NEW_CHAT;
        } else if (invocationMode.equals(INVOCATION_MODE_CHATS_LIST)) {
            mode = InvocationMode.CHATS_LIST;
        } else {
            mode = InvocationMode.PROMPT_OPTION;
        }

        Object[] objectArray = ArrayUtil.toArray(invocationOptions);
        String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);

        int[] arrayOfParsedOptions = new int[stringArray.length];
        int i = 0;
        for (String option : stringArray) {
            switch (option) {
                case EMAIL_FIELD_HIDDEN:
                    arrayOfParsedOptions[i++] = InvocationOption.EMAIL_FIELD_HIDDEN;
                    break;
                case EMAIL_FIELD_OPTIONAL:
                    arrayOfParsedOptions[i++] = InvocationOption.EMAIL_FIELD_OPTIONAL;
                    break;
                case COMMENT_FIELD_REQUIRED:
                    arrayOfParsedOptions[i++] = InvocationOption.COMMENT_FIELD_REQUIRED;
                    break;
                case DISABLE_POST_SENDING_DIALOG:
                    arrayOfParsedOptions[i++] = InvocationOption.DISABLE_POST_SENDING_DIALOG;
                    break;
                default:
                    break;
            }
        }
        try {
            BugReporting.invoke(mode, arrayOfParsedOptions);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Sets a block of code to be executed just before the SDK's UI is presented.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes before the SDK's UI is shown.
     *
     * @param preInvocationHandler - A callback that gets executed before
     *                             invoking the SDK
     */
    @ReactMethod
    public void setPreInvocationHandler(final Callback preInvocationHandler) {
        try {
            BugReporting.setOnInvokeCallback(new OnInvokeCallback() {
                @Override
                public void onInvoke() {
                    sendEvent(getReactApplicationContext(), "IBGpreInvocationHandler", null);
                }
            });
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Sets a block of code to be executed right after the SDK's UI is dismissed.
     * This block is executed on the UI thread. Could be used for performing any
     * UI changes after the SDK's UI is dismissed.
     *
     * @param postInvocationHandler - A callback to get executed after
     *                              dismissing the SDK.
     */
    @ReactMethod
    public void setPostInvocationHandler(final Callback postInvocationHandler) {
        try {
            BugReporting.setOnDismissCallback(new OnSdkDismissCallback() {
                @Override
                public void call(DismissType dismissType, ReportType reportType) {
                    WritableMap params = Arguments.createMap();
                    params.putString("dismissType", dismissType.toString());
                    params.putString("reportType", reportType.toString());
                    sendEvent(getReactApplicationContext(), "IBGpostInvocationHandler", params);
                }
            });
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Enable/Disable prompt options when SDK invoked. When only a single option is enabled it
     * becomes the default invocation option that SDK gets invoked with and prompt options screen
     * will not show. When none is enabled, Bug reporting becomes the default invocation option.
     *
     * @param chat     weather Talk to us is enable or not
     * @param bug      weather Report a Problem is enable or not
     * @param feedback weather General Feedback  is enable or not
     */
    @Deprecated
    @ReactMethod
    public void setPromptOptionsEnabled(boolean chat, boolean bug, boolean feedback) {

        ArrayList<PromptOption> options = new ArrayList<>();

        if (chat) {
            options.add(PromptOption.CHAT);
        }

        if (feedback) {
            options.add(PromptOption.FEEDBACK);
        }

        if (bug) {
            options.add(PromptOption.BUG);
        }

        try {
            BugReporting.setPromptOptionsEnabled(options.toArray(new PromptOption[0]));
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
     * @param androidThreshold Threshold for android devices.
     */
    @ReactMethod
    public void setShakingThresholdForAndroid(int androidThreshold) {
        try {
            BugReporting.setShakingThreshold(androidThreshold);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets whether the extended bug report mode should be disabled,
     * enabled with required fields,  or enabled with optional fields.
     *
     * @param extendedBugReportMode
     */
    @ReactMethod
    public void setExtendedBugReportMode(String extendedBugReportMode) {
        try {
            BugReporting.setExtendedBugReportState(ArgsRegistry.getDeserializedValue(extendedBugReportMode, ExtendedBugReport.State.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setReportTypes(ReadableArray types) {
        try {
            Object[] objectArray = ArrayUtil.toArray(types);
            String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
            int[] reportTypes = new int[stringArray.length];
            for (int i = 0; i < reportTypes.length; i++) {
                reportTypes[i] = ArgsRegistry.getDeserializedValue(stringArray[i], Integer.class);
            }
            BugReporting.setReportTypes(reportTypes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void showBugReportingWithReportTypeAndOptions(String reportType, ReadableArray options) {
        try {
            BugReporting.show(ArgsRegistry.getDeserializedValue(reportType, Integer.class));
            setInvocationOptions(options);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Enable/Disable screen recording
     *
     * @param autoScreenRecordingEnabled boolean for enable/disable
     *                                   screen recording on crash feature
     */
    @SuppressLint("NewApi")
    @ReactMethod
    public void setAutoScreenRecordingEnabled(boolean autoScreenRecordingEnabled) {
        try {
            BugReporting.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets auto screen recording maximum duration
     *
     * @param autoScreenRecordingMaxDuration maximum duration of the screen recording video
     *                                       in milliseconds
     *                                       The maximum duration is 30000 milliseconds
     */
    @Deprecated
    @ReactMethod
    public void setAutoScreenRecordingMaxDuration(int autoScreenRecordingMaxDuration) {
        try {
            int durationInMilli = autoScreenRecordingMaxDuration * 1000;
            Instabug.setAutoScreenRecordingMaxDuration(durationInMilli);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void setViewHierarchyEnabled(boolean enabled) {
        try {
            if (enabled) {
                BugReporting.setViewHierarchyState(Feature.State.ENABLED);
            } else {
                BugReporting.setViewHierarchyState(Feature.State.DISABLED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     +------------------------------------------------------------------------+
     |                            Surveys Module                              |
     +------------------------------------------------------------------------+
     */

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void setSurveysEnabled(boolean surveysEnabled) {
        try {
            Surveys.setAutoShowingEnabled(surveysEnabled);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void showSurveysIfAvailable() {
        try {
            Surveys.showSurveyIfAvailable();
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     * Set after how many sessions should the dismissed survey would show again.
     *
     * @param sessionsCount number of sessions that the dismissed survey will be shown after.
     * @param daysCount     number of days that the dismissed survey will show after
     */
    @Deprecated
    @ReactMethod
    public void setThresholdForReshowingSurveyAfterDismiss(int sessionsCount, int daysCount) {
        try {
            Surveys.setThresholdForReshowingSurveyAfterDismiss(sessionsCount, daysCount);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Returns an array containing the available surveys.
     * @param availableSurveysCallback - Callback with the returned value of the available surveys
     *
     */
    @ReactMethod
    public void getAvailableSurveys(Callback availableSurveysCallback) {
        try {
            List<Survey> availableSurveys = Surveys.getAvailableSurveys();
            JSONArray surveysArray = toJson(availableSurveys);
            WritableArray array = jsonToArray(surveysArray);
            availableSurveysCallback.invoke(array);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set Surveys auto-showing state, default state auto-showing enabled
     *
     * @param autoShowingSurveysEnabled whether Surveys should be auto-showing or not
     */
    @ReactMethod
    public void setAutoShowingSurveysEnabled(boolean autoShowingSurveysEnabled) {
        try {
            Surveys.setAutoShowingEnabled(autoShowingSurveysEnabled);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Sets the runnable that gets executed just before showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param willShowSurveyHandler to run on the UI thread before showing any valid survey
     */
    @ReactMethod
    public void setWillShowSurveyHandler(final Callback willShowSurveyHandler) {

        Surveys.setOnShowCallback(new OnShowCallback() {
            @Override
            public void onShow() {
                sendEvent(getReactApplicationContext(), "IBGWillShowSurvey", null);
            }
        });
    }

    /**
     * Sets the runnable that gets executed just after showing any valid survey<br/>
     * WARNING: This runs on your application's main UI thread. Please do not include
     * any blocking operations to avoid ANRs.
     *
     * @param didDismissSurveyHandler to run on the UI thread after showing any valid survey
     */
    @ReactMethod
    public void setDidDismissSurveyHandler(final Callback didDismissSurveyHandler) {

        Surveys.setOnDismissCallback(new OnDismissCallback() {
            @Override
            public void onDismiss() {
                sendEvent(getReactApplicationContext(), "IBGDidDismissSurvey", null);
            }
        });
    }

    /**
     * Shows survey with a specific token.
     * Does nothing if there are no available surveys with that specific token.
     * Answered and cancelled surveys won't show up again.
     *
     * @param surveyToken A String with a survey token.
     */
    @ReactMethod
    public void showSurveyWithToken(String surveyToken) {
        try {
            Surveys.showSurvey(surveyToken);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Returns true if the survey with a specific token was answered before.
     * Will return false if the token does not exist or if the survey was not answered before.
     *
     * @param surveyToken          the attribute key as string
     * @param hasRespondedCallback A callback that gets invoked with the returned value of whether
     *                             the user has responded to the survey or not.
     * @return the desired value of whether the user has responded to the survey or not.
     */
    @ReactMethod
    public void hasRespondedToSurveyWithToken(String surveyToken, Callback hasRespondedCallback) {
        boolean hasResponded;
        try {
            hasResponded = Surveys.hasRespondToSurvey(surveyToken);
            hasRespondedCallback.invoke(hasResponded);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set Surveys welcome screen enabled, default value is false
     *
     * @param shouldShow shouldShow whether should a welcome screen be shown
     *                   before taking surveys or not
     */
    @ReactMethod
    public void setShouldShowSurveysWelcomeScreen(boolean shouldShow) {
        try {
            Surveys.setShouldShowWelcomeScreen(shouldShow);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
    }

    /**
     +------------------------------------------------------------------------+
     |                            FeatureRequests Module                      |
     +------------------------------------------------------------------------+
     */

    /**
     * Sets whether email field is required or not when submitting
     * new-feature-request/new-comment-on-feature
     *
     * @param isEmailRequired set true to make email field required
     * @param actionTypes Bitwise-or of actions
     */
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setEmailFieldRequiredForFeatureRequests(boolean isEmailRequired, ReadableArray actionTypes) {
        try {
            Object[] objectArray = ArrayUtil.toArray(actionTypes);
            String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
            int[] parsedActionTypes = new int[stringArray.length];
            for (int i = 0; i < stringArray.length; i++) {
                parsedActionTypes[i] = ArgsRegistry.getDeserializedValue(stringArray[i], Integer.class);
            }

            FeatureRequests.setEmailFieldRequired(isEmailRequired, parsedActionTypes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * Shows the UI for feature requests list
     */
    @ReactMethod
    public void showFeatureRequests() {
        try {
            FeatureRequests.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     +------------------------------------------------------------------------+
     |                            Chats Module                                |
     +------------------------------------------------------------------------+
     */

    /**
     * Enable/disable Chats
     *
     * @param isEnabled desired state of the Chats feature
     */
    @ReactMethod
    public void setChatsEnabled(final boolean isEnabled) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
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
     * Shows the UI for chats
     */
    @ReactMethod
    public void showChats() {
        Chats.show();
    }

    /**
     +------------------------------------------------------------------------+
     |                            Replies Module                              |
     +------------------------------------------------------------------------+
     */

    /**
     * Enable/disable Replies
     *
     * @param isEnabled desired state of the Replies feature
     */
    @ReactMethod
    public void setRepliesEnabled(final boolean isEnabled) {
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

    /**
     * Returns a boolean to indicate if the user has chats.
     * @param callback - Callback with the returned hasChats boolean
     *
     */
    @ReactMethod
    public void hasChats(Callback callback) {
        boolean hasChats = Replies.hasChats();
        callback.invoke(hasChats);
    }

    /**
     * Shows the UI for Replies
     */
    @ReactMethod
    public void showReplies() {
        Replies.show();
    }

    @ReactMethod
    public void setOnNewReplyReceivedCallback(final Callback onNewReplyReceivedCallback) {
        try {
            Runnable onNewReplyReceivedRunnable = new Runnable() {
                @Override
                public void run() {
                    sendEvent(getReactApplicationContext(), "IBGOnNewReplyReceivedCallback", null);
                }
            };
            Replies.setOnNewReplyReceivedCallback(onNewReplyReceivedRunnable);
        } catch (java.lang.Exception exception) {
            exception.printStackTrace();
        }
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
    public void setChatNotificationEnabled(boolean isChatNotificationEnable) {
        try {
            Replies.setInAppNotificationEnabled(isChatNotificationEnable);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Set whether new in app notification received will play a small sound notification
     * or not (Default is {@code false})
     *
     * @param shouldPlaySound desired state of conversation sounds
     * @since 4.1.0
     */
    @ReactMethod
    public void setEnableInAppNotificationSound(boolean shouldPlaySound) {
        try {
            Replies.setInAppNotificationSound(shouldPlaySound);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     +------------------------------------------------------------------------+
     |                            CrashReporting Module                       |
     +------------------------------------------------------------------------+
     */

    /**
     * Sets whether crash reporting feature is Enabled or Disabled
     *
     * @param isEnabled Exception object to be sent to Instabug's servers
     */
    @ReactMethod
    public void setCrashReportingEnabled(boolean isEnabled) {
        try {
            if (isEnabled) {
                CrashReporting.setState(Feature.State.ENABLED);
            } else {
                CrashReporting.setState(Feature.State.DISABLED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Send handled JS error object
     *
     * @param exceptionObject Exception object to be sent to Instabug's servers
     */
    @ReactMethod
    public void sendHandledJSCrash(String exceptionObject) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, true, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Send unhandled JS error object
     *
     * @param exceptionObject Exception object to be sent to Instabug's servers
     */
    @ReactMethod
    public void sendJSCrash(String exceptionObject) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, false, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendJSCrashByReflection(JSONObject exceptionObject, boolean isHandled, Report report) {
        try {
            Method method = getMethod(Class.forName("com.instabug.crash.CrashReporting"), "reportException", JSONObject.class, boolean.class, Report.class);
            if (method != null) {
                method.invoke(null, exceptionObject, isHandled, currentReport);
                currentReport = null;
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    /**
     +------------------------------------------------------------------------+
     |                            NetworkLogging Module                       |
     +------------------------------------------------------------------------+
     */

    /**
     * Extracts HTTP connection properties. Request method, Headers, Date, Url and Response code
     *
     * @param jsonObject the JSON object containing all HTTP connection properties
     * @throws JSONException
     */
    @ReactMethod
    public void networkLog(String jsonObject) throws JSONException {
        NetworkLog networkLog = new NetworkLog();
        String date = System.currentTimeMillis()+"";
        networkLog.setDate(date);
        JSONObject newJSONObject = new JSONObject(jsonObject);
        networkLog.setUrl(newJSONObject.getString("url"));
        networkLog.setRequest(newJSONObject.getString("requestBody"));
        networkLog.setResponse(newJSONObject.getString("responseBody"));
        networkLog.setMethod(newJSONObject.getString("method"));
        networkLog.setResponseCode(newJSONObject.getInt("responseCode"));
        networkLog.setRequestHeaders(newJSONObject.getString("requestHeaders"));
        networkLog.setResponseHeaders(newJSONObject.getString("responseHeaders"));
        networkLog.setTotalDuration(newJSONObject.getLong("duration"));
        networkLog.insert();
    }

    /**
     +------------------------------------------------------------------------+
     |                            InstabugLog Module                          |
     +------------------------------------------------------------------------+
     */

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
     * @param message the message
     */
    @ReactMethod
    public void logVerbose(String message) {
        try {
            InstabugLog.v(message);
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
     * @param message the message
     */
    @ReactMethod
    public void logInfo(String message) {
        try {
            InstabugLog.i(message);
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
     * @param message the message
     */
    @ReactMethod
    public void logDebug(String message) {
        try {
            InstabugLog.d(message);
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
     * @param message the message
     */
    @ReactMethod
    public void logError(String message) {
        try {
            InstabugLog.e(message);
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
     * @param message the message
     */
    @ReactMethod
    public void logWarn(String message) {
        try {
            InstabugLog.w(message);
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


    @ReactMethod
    public void callPrivateApi(String apiName, String param) {
        try {
            if (param == null) {
                Method m = Internal.class.getDeclaredMethod(apiName);
                m.setAccessible(true);
                m.invoke(null);
            } else {
                Method m = Internal.class.getDeclaredMethod(apiName, param.getClass());
                m.setAccessible(true);
                m.invoke(null, param);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void appendTagToReport(String tag) {
        if (currentReport != null) {
            currentReport.addTag(tag);
        }
    }

    @ReactMethod
    public void appendConsoleLogToReport(String consoleLog) {
        if (currentReport != null) {
            currentReport.appendToConsoleLogs(consoleLog);
        }
    }

    @ReactMethod
    public void setUserAttributeToReport(String key, String value) {
        if (currentReport != null) {
            currentReport.setUserAttribute(key, value);
        }
    }

    @ReactMethod
    public void logDebugToReport(String log) {
        if (currentReport != null) {
            currentReport.logDebug(log);
        }
    }

    @ReactMethod
    public void logVerboseToReport(String log) {
        if (currentReport != null) {
            currentReport.logVerbose(log);
        }
    }

    @ReactMethod
    public void logWarnToReport(String log) {
        if (currentReport != null) {
            currentReport.logWarn(log);
        }
    }

    @ReactMethod
    public void logErrorToReport(String log) {
        if (currentReport != null) {
            currentReport.logError(log);
        }
    }

    @ReactMethod
    public void logInfoToReport(String log) {
        if (currentReport != null) {
            currentReport.logInfo(log);
        }
    }

    @ReactMethod
    public void addFileAttachmentWithURLToReport(String urlString, String fileName) {
        if (currentReport != null) {
            Uri uri = Uri.parse(urlString);
            currentReport.addFileAttachment(uri, fileName);
        }
    }

    @ReactMethod
    public void addFileAttachmentWithDataToReport(String data, String fileName) {
        if (currentReport != null) {
            currentReport.addFileAttachment(data.getBytes(), fileName);
        }
    }

    @ReactMethod
    public void getReport(Promise promise) {
        try {
            Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "getReport");
            if (method != null) {
                Report report = (Report) method.invoke(null);
                WritableMap reportParam = Arguments.createMap();
                reportParam.putArray("tagsArray", toWritableArray(report.getTags()));
                reportParam.putArray("consoleLogs", ReportUtil.parseConsoleLogs(report.getConsoleLog()));
                reportParam.putString("userData", report.getUserData());
                reportParam.putMap("userAttributes", toWritableMap(report.getUserAttributes()));
                reportParam.putMap("fileAttachments", toWritableMap(report.getFileAttachments()));
                promise.resolve(reportParam);
                currentReport = report;
            }

        } catch (ClassNotFoundException e) {
            promise.reject(e);
        } catch (IllegalAccessException e) {
            promise.reject(e);
        } catch (InvocationTargetException e) {
            promise.reject(e);
        }
    }

    private void sendEvent(ReactApplicationContext reactContext,
                                 String eventName,
                                 WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}