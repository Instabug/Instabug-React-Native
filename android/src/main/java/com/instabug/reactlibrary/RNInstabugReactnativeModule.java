package com.instabug.reactlibrary;

import android.annotation.SuppressLint;
import android.app.Application;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
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

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.instabug.bug.BugReporting;
import com.instabug.bug.instabugdisclaimer.Internal;
import com.instabug.bug.invocation.InvocationMode;
import com.instabug.bug.invocation.InvocationOption;
import com.instabug.bug.invocation.Option;
import com.instabug.chat.Chats;
import com.instabug.chat.Replies;
import com.instabug.crash.CrashReporting;
import com.instabug.featuresrequest.FeatureRequests;
import com.instabug.featuresrequest.ActionType;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugState;
import com.instabug.library.OnSdkDismissCallback;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.OnInvokeCallback;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.library.logging.InstabugLog;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.model.Report;
import com.instabug.library.model.NetworkLog;
import com.instabug.library.visualusersteps.State;

import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.InstabugUtil;
import com.instabug.reactlibrary.utils.MainThreadHandler;
import com.instabug.reactlibrary.utils.ReportUtil;
import com.instabug.survey.callbacks.*;
import com.instabug.survey.Survey;
import com.instabug.survey.Surveys;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;


/**
 * The type Rn instabug reactnative module.
 */
public class RNInstabugReactnativeModule extends ReactContextBaseJavaModule {

    private static final String TAG = RNInstabugReactnativeModule.class.getSimpleName();

    //LogLevel
    private final String LOG_LEVEL_NONE = "logLevelNone";
    private final String LOG_LEVEL_ERROR = "logLevelError";
    private final String LOG_LEVEL_WARNING = "logLevelWarning";
    private final String LOG_LEVEL_INFO = "logLevelInfo";
    private final String LOG_LEVEL_DEBUG = "logLevelDebug";
    private final String LOG_LEVEL_VERBOSE = "logLevelVerbose";

    //InvocationEvents
    private final String INVOCATION_EVENT_NONE = "invocationEventNone";
    private final String INVOCATION_EVENT_SHAKE = "invocationEventShake";
    private final String INVOCATION_EVENT_SCREENSHOT = "invocationEventScreenshot";
    private final String INVOCATION_EVENT_TWO_FINGERS_SWIPE = "invocationEventTwoFingersSwipe";
    private final String INVOCATION_EVENT_FLOATING_BUTTON = "invocationEventFloatingButton";
    //InvocationModes
    private final String INVOCATION_MODE_NA = "na";
    private final String INVOCATION_MODE_NEW_BUG = "bug";
    private final String INVOCATION_MODE_NEW_FEEDBACK = "feedback";
    private final String INVOCATION_MODE_NEW_CHAT = "chat";
    private final String INVOCATION_MODE_CHATS_LIST = "chats";
    //FloatingButtonEdge
    private final String FLOATING_BUTTON_EDGE_RIGHT = "right";
    private final String FLOATING_BUTTON_EDGE_LEFT = "left";
    //locales
    private final String LOCALE_ARABIC = "arabic";
    private final String LOCALE_AZERBAIJANI = "azerbaijani";
    private final String LOCALE_CHINESE_SIMPLIFIED = "chineseSimplified";
    private final String LOCALE_CHINESE_TRADITIONAL = "chineseTraditional";
    private final String LOCALE_CZECH = "czech";
    private final String LOCALE_DUTCH = "dutch";
    private final String LOCALE_ENGLISH = "english";
    private final String LOCALE_FRENCH = "french";
    private final String LOCALE_GERMAN = "german";
    private final String LOCALE_KOREAN = "korean";
    private final String LOCALE_ITALIAN = "italian";
    private final String LOCALE_JAPANESE = "japanese";
    private final String LOCALE_POLISH = "polish";
    private final String LOCALE_PORTUGUESE_BRAZIL = "portugueseBrazil";
    private final String LOCALE_RUSSIAN = "russian";
    private final String LOCALE_SPANISH = "spanish";
    private final String LOCALE_SWEDISH = "swedish";
    private final String LOCALE_TURKISH = "turkish";

    //Instabug Button Corner
    private final String TOP_RIGHT = "topRight";
    private final String TOP_LEFT = "topLeft";
    private final String BOTTOM_RIGHT = "bottomRight";
    private final String BOTTOM_LEFT = "bottomLeft";

    //Instabug extended bug report modes
    private final String EXTENDED_BUG_REPORT_REQUIRED_FIELDS = "enabledWithRequiredFields";
    private final String EXTENDED_BUG_REPORT_OPTIONAL_FIELDS = "enabledWithOptionalFields";
    private final String EXTENDED_BUG_REPORT_DISABLED = "disabled";

    //Instabug repro step modes
    private final String ENABLED_WITH_NO_SCREENSHOTS = "enabledWithNoScreenshots";
    private final String ENABLED = "enabled";
    private final String DISABLED = "disabled";

    //Instabug welcome message modes
    private final String WELCOME_MESSAGE_MODE_LIVE = "welcomeMessageModeLive";
    private final String WELCOME_MESSAGE_MODE_BETA = "welcomeMessageModeBeta";
    private final String WELCOME_MESSAGE_MODE_DISABLED = "welcomeMessageModeDisabled";

    //Theme colors
    private final String COLOR_THEME_LIGHT = "colorThemeLight";
    private final String COLOR_THEME_DARK = "colorThemeDark";

    //CustomTextPlaceHolders
    private final String SHAKE_HINT = "shakeHint";
    private final String SWIPE_HINT = "swipeHint";
    private final String INVALID_EMAIL_MESSAGE = "invalidEmailMessage";
    private final String INVALID_COMMENT_MESSAGE = "invalidCommentMessage";
    private final String EMAIL_FIELD_HINT = "emailFieldHint";
    private final String COMMENT_FIELD_HINT_FOR_BUG_REPORT = "commentFieldHintForBugReport";
    private final String COMMENT_FIELD_HINT_FOR_FEEDBACK = "commentFieldHintForFeedback";
    private final String COMMENT_FIELD_HINT_FOR_QUESTION = "commentFieldHintForQuestion";


    private final String INVOCATION_HEADER = "invocationHeader";
    private final String START_CHATS = "startChats";
    private final String REPORT_QUESTION = "reportQuestion";
    private final String REPORT_BUG = "reportBug";
    private final String REPORT_FEEDBACK = "reportFeedback";

    private final String ACTION_TYPE_ALL_ACTIONS = "allActions";
    private final String ACTION_TYPE_REPORT_BUG = "reportBugAction";
    private final String ACTION_TYPE_REQUEST_NEW_FEATURE = "requestNewFeature";
    private final String ACTION_TYPE_ADD_COMMENT_TO_FEATURE = "addCommentToFeature";

    private final String PROMPT_OPTION_BUG = "promptOptionBug";
    private final String PROMPT_OPTION_CHAT = "promptOptionChat";
    private final String PROMPT_OPTION_FEEDBACK = "promptOptionFeedback";

    private final String BUG_REPORTING_REPORT_TYPE_BUG = "bugReportingReportTypeBug";
    private final String BUG_REPORTING_REPORT_TYPE_FEEDBACK = "bugReportingReportTypeFeedback";
    private final String BUG_REPORTING_REPORT_TYPE_QUESTION = "bugReportingReportTypeQuestion";

    private final String EMAIL_FIELD_HIDDEN = "emailFieldHidden";
    private final String EMAIL_FIELD_OPTIONAL = "emailFieldOptional";
    private final String COMMENT_FIELD_REQUIRED = "commentFieldRequired";
    private final String DISABLE_POST_SENDING_DIALOG = "disablePostSendingDialog";

    private final String CONVERSATIONS_LIST_TITLE = "conversationsListTitle";

    private final String ADD_VOICE_MESSAGE = "addVoiceMessage";
    private final String ADD_IMAGE_FROM_GALLERY = "addImageFromGallery";
    private final String ADD_EXTRA_SCREENSHOT = "addExtraScreenshot";
    private final String ADD_VIDEO = "addVideoMessage";

    private final String AUDIO_RECORDING_PERMISSION_DENIED = "audioRecordingPermissionDenied";

    private final String VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD = "voiceMessagePressAndHoldToRecord";
    private final String VOICE_MESSAGE_RELEASE_TO_ATTACH = "voiceMessageReleaseToAttach";

    private final String REPORT_SUCCESSFULLY_SENT = "reportSuccessfullySent";
    private final String THANK_YOU_ALERT_TEXT = "successDialogHeader";

    private final String WELCOME_MESSAGE_BETA_WELCOME_STEP_TITLE = "betaWelcomeMessageWelcomeStepTitle";
    private final String WELCOME_MESSAGE_BETA_WELCOME_STEP_CONTENT = "betaWelcomeMessageWelcomeStepContent";
    private final String WELCOME_MESSAGE_HOW_TO_REPORT_STEP_TITLE = "betaWelcomeMessageHowToReportStepTitle";
    private final String WELCOME_MESSAGE_HOW_TO_REPORT_STEP_CONTENT = "betaWelcomeMessageHowToReportStepContent";
    private final String WELCOME_MESSAGE_FINISH_STEP_TITLE = "betaWelcomeMessageFinishStepTitle";
    private final String WELCOME_MESSAGE_FINISH_STEP_CONTENT = "betaWelcomeMessageFinishStepContent";
    private final String WELCOME_MESSAGE_LIVE_WELCOME_STEP_TITLE = "liveWelcomeMessageTitle";
    private final String WELCOME_MESSAGE_LIVE_WELCOME_STEP_CONTENT = "liveWelcomeMessageContent";

    private final String CUSTOM_SURVEY_THANKS_TITLE = "surveysCustomThanksTitle";
    private final String CUSTOM_SURVEY_THANKS_SUBTITLE = "surveysCustomThanksSubTitle";

    private final String STORE_RATING_THANKS_TITLE = "surveysStoreRatingThanksTitle";
    private final String STORE_RATING_THANKS_SUBTITLE = "surveysStoreRatingThanksSubtitle";

    private final String VIDEO_PLAYER_TITLE = "video";

    private final String CONVERSATION_TEXT_FIELD_HINT = "conversationTextFieldHint";

    private final String REPORT_BUG_DESCRIPTION = "reportBugDescription";
    private final String REPORT_FEEDBACK_DESCRIPTION = "reportFeedbackDescription";
    private final String REPORT_QUESTION_DESCRIPTION = "reportQuestionDescription";
    private final String REQUEST_FEATURE_DESCRIPTION = "requestFeatureDescription";

    private final String REPORT_DISCARD_DIALOG_TITLE = "discardAlertTitle";
    private final String REPORT_DISCARD_DIALOG_BODY = "discardAlertMessage";
    private final String REPORT_DISCARD_DIALOG_NEGATIVE_ACTION = "discardAlertCancel";
    private final String REPORT_DISCARD_DIALOG_POSITIVE_ACTION = "discardAlertAction";
    private final String REPORT_ADD_ATTACHMENT_HEADER = "addAttachmentButtonTitleStringName";

    private Application androidApplication;
    private Instabug mInstabug;
    private InstabugInvocationEvent invocationEvent;
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
        this.androidApplication = androidApplication;
        this.mInstabug = mInstabug;
        //init placHolders
        placeHolders = new InstabugCustomTextPlaceHolder();
    }

    @Override
    public String getName() {
        return "Instabug";
    }

  /**
   * Starts the SDK.
   * @param token string The token that identifies the app, you can find
   * it on your dashboard.
   * @param invocationEventValues ReadableArray The events that invokes
   * the SDK's UI.
   */
    @ReactMethod
    public void startWithToken(final String token, final ReadableArray invocationEventValues) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(invocationEventValues);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    final InstabugInvocationEvent[] invocationEventsArray = new InstabugInvocationEvent[stringArray.length];

                    for (int i = 0; i < stringArray.length; i++) {
                        String key = stringArray[i];
                        invocationEventsArray[i] = ArgsRegistry.getDeserializedValue(key, InstabugInvocationEvent.class);
                    }
                    new Instabug.Builder(getCurrentActivity().getApplication(), token).setInvocationEvents(invocationEventsArray).build();
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
    public void appendTags(final ReadableArray tags) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(tags);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    Instabug.addTags(stringArray);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }

    /**
     * Enable/Disable screen recording
     *
     * @param autoScreenRecordingEnabled boolean for enable/disable
     *                                   screen recording on crash feature
     */
    @ReactMethod
    public void setAutoScreenRecordingEnabled(final boolean autoScreenRecordingEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setAutoScreenRecordingEnabled(autoScreenRecordingEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets auto screen recording maximum duration
     *
     * @param autoScreenRecordingMaxDuration maximum duration of the screen recording video
     *                                       in milliseconds
     *                                       The maximum duration is 30000 milliseconds
     */
    @ReactMethod
    public void setAutoScreenRecordingMaxDuration(final int autoScreenRecordingMaxDuration) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    int durationInMilli = autoScreenRecordingMaxDuration * 1000;
                    Instabug.setAutoScreenRecordingMaxDuration(durationInMilli);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Change Locale of Instabug UI elements(defaults to English)
     *
     * @param instabugLocale
     */
    @ReactMethod
    public void setLocale(final String instabugLocale) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setLocale(getLocaleByKey(instabugLocale));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets whether the extended bug report mode should be disabled,
     * enabled with required fields,  or enabled with optional fields.
     *
     * @param extendedBugReportMode
     */
    @ReactMethod
    public void setExtendedBugReportMode(final String extendedBugReportMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    switch (extendedBugReportMode) {
                        case EXTENDED_BUG_REPORT_REQUIRED_FIELDS:
                            BugReporting.setExtendedBugReportState(ExtendedBugReport.State.ENABLED_WITH_REQUIRED_FIELDS);
                            break;
                        case EXTENDED_BUG_REPORT_OPTIONAL_FIELDS:
                            BugReporting.setExtendedBugReportState(ExtendedBugReport.State.ENABLED_WITH_OPTIONAL_FIELDS);
                            break;
                        case EXTENDED_BUG_REPORT_DISABLED:
                            BugReporting.setExtendedBugReportState(ExtendedBugReport.State.DISABLED);
                            break;
                        default:
                            BugReporting.setExtendedBugReportState(ExtendedBugReport.State.DISABLED);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void setViewHierarchyEnabled(final boolean enabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });
    }

    /**
     * The file at filePath will be uploaded along upcoming reports with the name
     * fileNameWithExtension
     *
     * @param fileUri               the file uri
     * @param fileNameWithExtension the file name with extension
     */
    @ReactMethod
    public void setFileAttachment(final String fileUri, final String fileNameWithExtension) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    File file = new File(fileUri);
                    if (file.exists()) {
                        Instabug.addFileAttachment(Uri.fromFile(file), fileNameWithExtension);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

    }

    /**
     * Send unhandled JS error object
     *
     * @param exceptionObject Exception object to be sent to Instabug's servers
     */
    @ReactMethod
    public void sendJSCrash(final String exceptionObject) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, false);
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
    public void sendHandledJSCrash(final String exceptionObject) {
        try {
            JSONObject jsonObject = new JSONObject(exceptionObject);
            sendJSCrashByReflection(jsonObject, true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sets whether crash reporting feature is Enabled or Disabled
     *
     * @param isEnabled Exception object to be sent to Instabug's servers
     */
    @ReactMethod
    public void setCrashReportingEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });
    }

 private void sendJSCrashByReflection(final JSONObject exceptionObject, final boolean isHandled) {
     MainThreadHandler.runOnMainThread(new Runnable() {
         @Override
         public void run() {
             try {
                 Method method = getMethod(Class.forName("com.instabug.crash.CrashReporting"), "reportException", JSONObject.class, boolean.class);
                 if (method != null) {
                     method.invoke(null, exceptionObject, isHandled);
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
     });

    }

    /**
     * Adds specific user data that you need to be added to the reports
     *
     * @param userData
     */
    @ReactMethod
    public void setUserData(final String userData) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setUserData(userData);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
        MainThreadHandler.runOnMainThread(new Runnable() {
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
     * Gets tags.
     *
     * @return all tags added
     * @see #resetTags()
     */
    @ReactMethod
    public void getTags(final Callback tagsCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableArray tagsArray;
                try {
                    ArrayList<String> tags = Instabug.getTags();
                    tagsArray = Arguments.createArray();
                    for (int i = 0; i < tags.size(); i++) {
                        tagsArray.pushString(tags.get(i));
                    }
                    tagsCallback.invoke(tagsArray);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Set the user identity.
     * Instabug will pre-fill the user email in reports.
     *
     * @param userName  Username.
     * @param userEmail User's default email
     */
    @ReactMethod
    public void identifyUserWithEmail(final String userEmail, final String userName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.identifyUser(userName, userEmail);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Reset ALL tags added
     */
    @ReactMethod
    public void resetTags() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.resetTags();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
     * Enables all Instabug functionality
     */
    @ReactMethod
    public void enable() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.enable();
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
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.disable();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows the UI for feature requests list
     */
    @ReactMethod
    public void showFeatureRequests() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    FeatureRequests.show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
     * Get current unread count of messages for this user
     *
     * @return number of messages that are unread for this user
     */
    @ReactMethod
    public void getUnreadMessagesCount(final Callback messageCountCallback) {
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
     * @deprecated
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationEventValue the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationEvent(final String invocationEventValue) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setInvocationEvents(getInvocationEventById(invocationEventValue));
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
            final ArrayList<InstabugInvocationEvent> parsedInvocationEvents = new ArrayList<>();

            for (String action : stringArray) {
                switch (action) {
                    case INVOCATION_EVENT_FLOATING_BUTTON:
                        parsedInvocationEvents.add(InstabugInvocationEvent.FLOATING_BUTTON);
                        break;
                    case INVOCATION_EVENT_TWO_FINGERS_SWIPE:
                        parsedInvocationEvents.add(InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT);
                        break;
                    case INVOCATION_EVENT_SHAKE:
                        parsedInvocationEvents.add(InstabugInvocationEvent.SHAKE);
                        break;
                    case INVOCATION_EVENT_SCREENSHOT:
                        parsedInvocationEvents.add(InstabugInvocationEvent.SCREENSHOT);
                        break;
                    case INVOCATION_EVENT_NONE:
                        parsedInvocationEvents.add(InstabugInvocationEvent.NONE);
                        break;
                    default:
                        parsedInvocationEvents.add(InstabugInvocationEvent.SHAKE);
                        break;
                }
            }
            MainThreadHandler.runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        BugReporting.setInvocationEvents(parsedInvocationEvents.toArray(new InstabugInvocationEvent[0]));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
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
                invocationEvent = InstabugInvocationEvent.SCREENSHOT;
            } else if (invocationEventValue.equals(INVOCATION_EVENT_NONE)) {
                invocationEvent = InstabugInvocationEvent.NONE;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return invocationEvent;
    }

    /**
     * Sets the event used to invoke Instabug SDK
     *
     * @param invocationOptionValues the invocation event value
     * @see InstabugInvocationEvent
     */
    @ReactMethod
    public void setInvocationOptions(final ReadableArray invocationOptionValues) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(invocationOptionValues);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    for (String option : stringArray) {
                        switch (option) {
                            case EMAIL_FIELD_HIDDEN:
                                BugReporting.setOptions(Option.EMAIL_FIELD_HIDDEN);
                                return;
                            case EMAIL_FIELD_OPTIONAL:
                                BugReporting.setOptions(Option.EMAIL_FIELD_OPTIONAL);
                                break;
                            case COMMENT_FIELD_REQUIRED:
                                BugReporting.setOptions(Option.COMMENT_FIELD_REQUIRED);
                                break;
                            case DISABLE_POST_SENDING_DIALOG:
                                BugReporting.setOptions(Option.DISABLE_POST_SENDING_DIALOG);
                                break;
                            default:
                                BugReporting.setOptions(Option.EMAIL_FIELD_HIDDEN,
                                        Option.EMAIL_FIELD_OPTIONAL,
                                        Option.COMMENT_FIELD_REQUIRED,
                                        Option.DISABLE_POST_SENDING_DIALOG);
                                break;
                        }
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
    public void setChatNotificationEnabled(final boolean isChatNotificationEnable) {
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
     * Enable/Disable debug logs from Instabug SDK
     * Default state: disabled
     *
     * @param isDebugEnabled whether debug logs should be printed or not into LogCat
     */
    @ReactMethod
    public void setDebugEnabled(final boolean isDebugEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setDebugEnabled(isDebugEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Report a caught exception to Instabug dashboard
     *
     * @param stack           the exception to be reported
     * @param message         the message of the exception to be reported
     * @param errorIdentifier used to group issues manually reported
     */
    @ReactMethod
    public void reportJsException(final ReadableArray stack, final String message, final String errorIdentifier) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
                        CrashReporting.reportException(throwable);
                    else
                        CrashReporting.reportException(throwable, errorIdentifier);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
     * @param level   the level
     * @param message the message
     */
    @ReactMethod
    public void log(final String level, final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });

    }

    @ReactMethod
    public void logVerbose(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.v(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logDebug(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.d(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logInfo(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.i(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logError(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.e(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void logWarn(final String message) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.w(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Clears Instabug internal log
     */
    @ReactMethod
    public void clearLogs() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InstabugLog.clearLogs();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
    public void hasRespondedToSurveyWithToken(final String surveyToken, final Callback hasRespondedCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                boolean hasResponded;
                try {
                    hasResponded = Surveys.hasRespondToSurvey(surveyToken);
                    hasRespondedCallback.invoke(hasResponded);
                } catch (Exception e) {
                    e.printStackTrace();
                }
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
    public void showSurveyWithToken(final String surveyToken) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.showSurvey(surveyToken);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets user attribute to overwrite it's value or create a new one if it doesn't exist.
     *
     * @param key   the attribute
     * @param value the value
     */
    @ReactMethod
    public void setUserAttribute(final String key, final String value) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setUserAttribute(key, value);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Gets specific user attribute.
     *
     * @param key the attribute key as string
     * @return the desired user attribute
     */
    @ReactMethod
    public void getUserAttribute(final String key, final Callback userAttributeCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                String userAttribute;
                try {
                    userAttribute = Instabug.getUserAttribute(key);
                    userAttributeCallback.invoke(userAttribute);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Removes user attribute if exists.
     *
     * @param key the attribute key as string
     * @see #setUserAttribute(String, String)
     */
    @ReactMethod
    public void removeUserAttribute(final String key) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.removeUserAttribute(key);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Gets all saved user attributes.
     *
     * @return all user attributes as HashMap<String, String>
     */
    @ReactMethod
    public void getAllUserAttributes(final Callback userAttributesCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableMap writableMap = Arguments.createMap();
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
        });
    }

    /**
     * Clears all user attributes if exists.
     */
    @ReactMethod
    public void clearAllUserAttributes() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.clearAllUserAttributes();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets InstabugSDK theme color.
     *
     * @param theme which is a constant String "light" or "dark"
     */
    @ReactMethod
    public void setColorTheme(final String theme) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (theme.equals(COLOR_THEME_LIGHT)) {
                        Instabug.setColorTheme(InstabugColorTheme.InstabugColorThemeLight);

                    } else if (theme.equals(COLOR_THEME_DARK)) {
                        Instabug.setColorTheme(InstabugColorTheme.InstabugColorThemeDark);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
    
    /**
     * Overrides any of the strings shown in the SDK with custom ones.
     * Allows you to customize any of the strings shown to users in the SDK.
     *
     * @param string String value to override the default one.
     * @param key    Key of string to override.
     */
    @ReactMethod
    public void setString(final String string, final String key) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    placeHolders.set(getStringToKeyConstant(key), string);
                    Instabug.setCustomTextPlaceHolders(placeHolders);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the default value of the user's email to null and show email field and remove user
     * name from all reports
     * It also reset the chats on device and removes user attributes, user data and completed
     * surveys.
     */
    @ReactMethod
    public void logOut() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.logoutUser();
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Logs a user event that happens through the lifecycle of the application.
     * Logged user events are going to be sent with each report, as well as at the end of a session.
     *
     * @param name Event name.
     */
    @ReactMethod
    public void logUserEventWithName(final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.logUserEvent(name);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
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
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });
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
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Instabug.onReportSubmitHandler(new Report.OnReportCreatedListener() {
                    @Override
                    public void onReportCreated(Report report) {
                        WritableMap reportParam = Arguments.createMap();
                        reportParam.putArray("tagsArray", convertArrayListToWritableArray(report.getTags()));
                        reportParam.putArray("consoleLogs", convertArrayListToWritableArray(report.getConsoleLog()));
                        reportParam.putString("userData", report.getUserData());
                        reportParam.putMap("userAttributes", convertFromHashMapToWriteableMap(report.getUserAttributes()));
                        reportParam.putMap("fileAttachments", convertFromHashMapToWriteableMap(report.getFileAttachments()));
                        sendEvent(getReactApplicationContext(), "IBGpreSendingHandler", reportParam);
                        currentReport = report;
                    }
                });
            }
        });

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
                reportParam.putArray("tagsArray", convertArrayListToWritableArray(report.getTags()));
                reportParam.putArray("consoleLogs", ReportUtil.parseConsoleLogs(report.getConsoleLog()));
                reportParam.putString("userData", report.getUserData());
                reportParam.putMap("userAttributes", convertFromHashMapToWriteableMap(report.getUserAttributes()));
                reportParam.putMap("fileAttachments", convertFromHashMapToWriteableMap(report.getFileAttachments()));
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


    private WritableMap convertFromHashMapToWriteableMap(HashMap hashMap) {
        WritableMap writableMap = new WritableNativeMap();
        for(int i = 0; i < hashMap.size(); i++) {
            Object key = hashMap.keySet().toArray()[i];
            Object value = hashMap.get(key);
            writableMap.putString((String) key,(String) value);
        }
        return writableMap;
    }

    private static JSONObject objectToJSONObject(Object object){
        Object json = null;
        JSONObject jsonObject = null;
        try {
            json = new JSONTokener(object.toString()).nextValue();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        if (json instanceof JSONObject) {
            jsonObject = (JSONObject) json;
        }
        return jsonObject;
    }

    private WritableArray convertArrayListToWritableArray(List arrayList) {
        WritableArray writableArray = new WritableNativeArray();

        for(int i = 0; i < arrayList.size(); i++) {
            Object object = arrayList.get(i);

            if(object instanceof String) {
                writableArray.pushString((String) object);
            }
            else {
                JSONObject jsonObject = objectToJSONObject(object);
                writableArray.pushMap((WritableMap) jsonObject);
            }
        }

        return writableArray;

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
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void showSurveysIfAvailable() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.showSurveyIfAvailable();
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Show any valid survey if exist
     *
     * @return true if a valid survey was shown otherwise false
     */
    @ReactMethod
    public void setSurveysEnabled(final boolean surveysEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setAutoShowingEnabled(surveysEnabled);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
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
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Surveys.setOnShowCallback(new OnShowCallback() {
                    @Override
                    public void onShow() {
                        sendEvent(getReactApplicationContext(), "IBGWillShowSurvey", null);
                    }
                });
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
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Surveys.setOnDismissCallback(new OnDismissCallback() {
                    @Override
                    public void onDismiss() {
                        sendEvent(getReactApplicationContext(), "IBGDidDismissSurvey", null);
                    }
                });
            }
        });
    }


    /**
     * Clears all Uris of the attached files.
     * The URIs which added via {@link Instabug#addFileAttachment} API not the physical files.
     */
    @ReactMethod
    public void clearFileAttachment() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.clearFileAttachment();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

 /**
     * Sets whether user steps tracking is visual, non visual or disabled.
     *
     * @param reproStepsMode A string to set user steps tracking to be
     *                       enabled, non visual or disabled.
     */
    @ReactMethod
    public void setReproStepsMode(final String reproStepsMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setReproStepsState( ArgsRegistry.getDeserializedValue(reproStepsMode, State.class));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Shows the welcome message in a specific mode.
     *
     * @param welcomeMessageMode An enum to set the welcome message mode to
      *                          live, or beta.
     */
    @ReactMethod
    public void showWelcomeMessageWithMode(final String welcomeMessageMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    switch (welcomeMessageMode) {
                        case WELCOME_MESSAGE_MODE_LIVE:
                            Instabug.showWelcomeMessage(WelcomeMessage.State.LIVE);
                            break;
                        case WELCOME_MESSAGE_MODE_BETA:
                            Instabug.showWelcomeMessage(WelcomeMessage.State.BETA);
                            break;
                        case WELCOME_MESSAGE_MODE_DISABLED:
                            Instabug.showWelcomeMessage(WelcomeMessage.State.DISABLED);
                            break;
                        default:
                            Instabug.showWelcomeMessage(WelcomeMessage.State.LIVE);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets the welcome message mode to live, beta or disabled.
     *
     * @param welcomeMessageMode An enum to set the welcome message mode to
      *                          live, beta or disabled.
     */
    @ReactMethod
    public void setWelcomeMessageMode(final String welcomeMessageMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    switch (welcomeMessageMode) {
                        case WELCOME_MESSAGE_MODE_LIVE:
                            Instabug.setWelcomeMessageState(WelcomeMessage.State.LIVE);
                            break;
                        case WELCOME_MESSAGE_MODE_BETA:
                            Instabug.setWelcomeMessageState(WelcomeMessage.State.BETA);
                            break;
                        case WELCOME_MESSAGE_MODE_DISABLED:
                            Instabug.setWelcomeMessageState(WelcomeMessage.State.DISABLED);
                            break;
                        default:
                            Instabug.setWelcomeMessageState(WelcomeMessage.State.LIVE);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
    public void setShakingThresholdForAndroid(final int androidThreshold) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    BugReporting.setShakingThreshold(androidThreshold);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * @deprecated
     * Sets a block of code that gets executed when a new message is received.
     *
     * @param onNewMessageHandler - A callback that gets
     *                            executed when a new message is received.
     */
    @ReactMethod
    public void setOnNewMessageHandler(final Callback onNewMessageHandler) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Runnable onNewMessageRunnable = new Runnable() {
                        @Override
                        public void run() {
                            sendEvent(getReactApplicationContext(), "IBGonNewMessageHandler", null);
                        }
                    };
                    Replies.setOnNewReplyReceivedCallback(onNewMessageRunnable);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void setOnNewReplyReceivedCallback(final Callback onNewReplyReceivedCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });
    }

    /**
     * Set after how many sessions should the dismissed survey would show again.
     *
     * @param sessionsCount number of sessions that the dismissed survey will be shown after.
     * @param daysCount     number of days that the dismissed survey will show after
     */
    @ReactMethod
    public void setThresholdForReshowingSurveyAfterDismiss(final int sessionsCount, final int daysCount) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setThresholdForReshowingSurveyAfterDismiss(sessionsCount, daysCount);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Returns an array containing the available surveys.
     * @param availableSurveysCallback - Callback with the returned value of the available surveys
     *
     */
    @ReactMethod
    public void getAvailableSurveys(final Callback availableSurveysCallback) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    List<Survey> availableSurveys = Surveys.getAvailableSurveys();
                    JSONArray surveysArray = toJson(availableSurveys);
                    WritableArray array = convertJsonToArray(surveysArray);
                    availableSurveysCallback.invoke(array);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void show() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Instabug.show();
            }
        });
    }

    @ReactMethod
    public void setBugReportingEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
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

    @ReactMethod
    public void setChatsEnabled(final boolean isEnabled) {
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

    @ReactMethod
    public void showChats() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Chats.show();
            }
        });
    }

    @ReactMethod
    public void setRepliesEnabled(final boolean isEnabled) {
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
    public void showReplies() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                Replies.show();
            }
        });
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



    private static WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof  Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof  Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String)  {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    private static WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = Arguments.createArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String)  {
                array.pushString((String) value);
            }
        }
        return array;
    }

    /**
     * Convenience method to convert from a list of Surveys to a JSON array
     *
     * @param list
     *        List of Surveys to be converted to JSON array
     */
    public static JSONArray toJson(List<Survey> list) {
        JSONArray jsonArray = new JSONArray();
        try{
            for (Survey obj : list) {
                JSONObject object = new JSONObject();
                object.put("title", obj.getTitle());
                jsonArray.put(object);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    /**
     * Set Surveys auto-showing state, default state auto-showing enabled
     *
     * @param autoShowingSurveysEnabled whether Surveys should be auto-showing or not
     */
    @ReactMethod
    public void setAutoShowingSurveysEnabled(final boolean autoShowingSurveysEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setAutoShowingEnabled(autoShowingSurveysEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
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
    public void setEnableInAppNotificationSound(final boolean shouldPlaySound) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    try {
                        Replies.setInAppNotificationSound(shouldPlaySound);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enable/disable session profiler
     *
     * @param sessionProfilerEnabled desired state of the session profiler feature
     */
    @ReactMethod
    public void setSessionProfilerEnabled(final boolean sessionProfilerEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
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
        });
    }

    /**
     * Set Surveys welcome screen enabled, default value is false
     *
     * @param shouldShow shouldShow whether should a welcome screen be shown
     *                   before taking surveys or not
     */
    @ReactMethod
    public void setShouldShowSurveysWelcomeScreen(final boolean shouldShow) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Surveys.setShouldShowWelcomeScreen(shouldShow);
                } catch (java.lang.Exception exception) {
                    exception.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets whether email field is required or not when submitting
     * new-feature-request/new-comment-on-feature
     *
     * @param isEmailRequired set true to make email field required
     * @param actionTypes Bitwise-or of actions
     */
    @SuppressLint("WrongConstant")
    @ReactMethod
    public void setEmailFieldRequiredForFeatureRequests(final boolean isEmailRequired, final ReadableArray actionTypes) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Object[] objectArray = ArrayUtil.toArray(actionTypes);
                    String[] stringArray = Arrays.copyOf(objectArray, objectArray.length, String[].class);
                    int[] parsedActionTypes = new int[stringArray.length];
                    int i = 0;
                    for (String action : stringArray) {
                        switch (action) {
                            case ACTION_TYPE_REQUEST_NEW_FEATURE:
                                parsedActionTypes[i++] = ActionType.REQUEST_NEW_FEATURE;
                                break;
                            case ACTION_TYPE_ADD_COMMENT_TO_FEATURE:
                                parsedActionTypes[i++] = ActionType.ADD_COMMENT_TO_FEATURE;
                                break;
                            default:

                                break;
                        }
                    }

                    FeatureRequests.setEmailFieldRequired(isEmailRequired, parsedActionTypes);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

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


    @ReactMethod
    public void hideView(final ReadableArray ids) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                UIManagerModule uiManagerModule = getReactApplicationContext().getNativeModule(UIManagerModule.class);
                uiManagerModule.prependUIBlock(new UIBlock() {
                    @Override
                    public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                        final View[] arrayOfViews = new View[ids.size()];
                        for (int i = 0; i < ids.size(); i++) {
                            int viewId = (int) ids.getDouble(i);
                            try {
                                arrayOfViews[i] = nativeViewHierarchyManager.resolveView(viewId);
                            } catch(Exception e) {
                                e.printStackTrace();
                            }
                        }
                        Instabug.setViewsAsPrivate(arrayOfViews);
                    }
                });
            }
        });
    }

    /**
     * Reports that the screen has been changed (Repro Steps) the screen sent to this method will be the 'current view' on the dashboard
     *
     * @param screenName string containing the screen name
     *
     */
    @ReactMethod
    public void reportScreenChange(final String screenName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "reportScreenChange", Bitmap.class, String.class);
                    if (method != null) {
                        method.invoke(null , null, screenName);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
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
            case COMMENT_FIELD_HINT_FOR_QUESTION:
                return InstabugCustomTextPlaceHolder.Key.COMMENT_FIELD_HINT_FOR_QUESTION;
            case INVOCATION_HEADER:
                return InstabugCustomTextPlaceHolder.Key.INVOCATION_HEADER;
            case START_CHATS:
                return InstabugCustomTextPlaceHolder.Key.START_CHATS;
            case REPORT_QUESTION:
                return InstabugCustomTextPlaceHolder.Key.REPORT_QUESTION;
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
            case THANK_YOU_ALERT_TEXT:
                return InstabugCustomTextPlaceHolder.Key.SUCCESS_DIALOG_HEADER;
            case WELCOME_MESSAGE_BETA_WELCOME_STEP_TITLE:
                return InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_WELCOME_STEP_TITLE;
            case WELCOME_MESSAGE_BETA_WELCOME_STEP_CONTENT:
                return InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_WELCOME_STEP_CONTENT;
            case WELCOME_MESSAGE_HOW_TO_REPORT_STEP_TITLE:
                return InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_HOW_TO_REPORT_STEP_TITLE;
            case WELCOME_MESSAGE_HOW_TO_REPORT_STEP_CONTENT:
                return InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_HOW_TO_REPORT_STEP_CONTENT;
            case WELCOME_MESSAGE_FINISH_STEP_TITLE:
                return InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_FINISH_STEP_TITLE;
            case WELCOME_MESSAGE_FINISH_STEP_CONTENT:
                return InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_FINISH_STEP_CONTENT;
            case WELCOME_MESSAGE_LIVE_WELCOME_STEP_TITLE:
                return InstabugCustomTextPlaceHolder.Key.LIVE_WELCOME_MESSAGE_TITLE;
            case WELCOME_MESSAGE_LIVE_WELCOME_STEP_CONTENT:
                return InstabugCustomTextPlaceHolder.Key.LIVE_WELCOME_MESSAGE_CONTENT;
            case CUSTOM_SURVEY_THANKS_TITLE:
                    return InstabugCustomTextPlaceHolder.Key.SURVEYS_CUSTOM_THANKS_TITLE;
            case CUSTOM_SURVEY_THANKS_SUBTITLE:
                    return InstabugCustomTextPlaceHolder.Key.SURVEYS_CUSTOM_THANKS_SUBTITLE;
            case STORE_RATING_THANKS_TITLE:
                    return InstabugCustomTextPlaceHolder.Key.SURVEYS_STORE_RATING_THANKS_TITLE;
            case STORE_RATING_THANKS_SUBTITLE:
                    return InstabugCustomTextPlaceHolder.Key.SURVEYS_STORE_RATING_THANKS_SUBTITLE;
            case REPORT_BUG_DESCRIPTION:
                return InstabugCustomTextPlaceHolder.Key.REPORT_BUG_DESCRIPTION;
            case REPORT_FEEDBACK_DESCRIPTION:
                return InstabugCustomTextPlaceHolder.Key.REPORT_FEEDBACK_DESCRIPTION;
            case REPORT_QUESTION_DESCRIPTION:
                return InstabugCustomTextPlaceHolder.Key.REPORT_QUESTION_DESCRIPTION;
            case REQUEST_FEATURE_DESCRIPTION:
                return InstabugCustomTextPlaceHolder.Key.REQUEST_FEATURE_DESCRIPTION;
            case REPORT_DISCARD_DIALOG_TITLE:
                return InstabugCustomTextPlaceHolder.Key.REPORT_DISCARD_DIALOG_TITLE;
            case REPORT_DISCARD_DIALOG_BODY:
                return InstabugCustomTextPlaceHolder.Key.REPORT_DISCARD_DIALOG_BODY;
            case REPORT_DISCARD_DIALOG_NEGATIVE_ACTION:
                return InstabugCustomTextPlaceHolder.Key.REPORT_DISCARD_DIALOG_NEGATIVE_ACTION;
            case REPORT_DISCARD_DIALOG_POSITIVE_ACTION:
                return InstabugCustomTextPlaceHolder.Key.REPORT_DISCARD_DIALOG_POSITIVE_ACTION;
            case REPORT_ADD_ATTACHMENT_HEADER:
                return InstabugCustomTextPlaceHolder.Key.REPORT_ADD_ATTACHMENT_HEADER;
            default:
                return null;
        }
    }

    private InstabugVideoRecordingButtonPosition getVideoRecordingButtonCorner(String cornerValue) {
        InstabugVideoRecordingButtonPosition corner = InstabugVideoRecordingButtonPosition.BOTTOM_RIGHT;
        try {
            if (cornerValue.equals(BOTTOM_RIGHT)) {
                corner = InstabugVideoRecordingButtonPosition.BOTTOM_RIGHT;
            } else if (cornerValue.equals(BOTTOM_LEFT)) {
                corner = InstabugVideoRecordingButtonPosition.BOTTOM_LEFT;
            } else if (cornerValue.equals(TOP_LEFT)) {
                corner = InstabugVideoRecordingButtonPosition.TOP_LEFT;
            } else if (cornerValue.equals(TOP_RIGHT)) {
                corner = InstabugVideoRecordingButtonPosition.TOP_RIGHT;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return corner;
    }

    private Locale getLocaleByKey(String instabugLocale) {
        return ArgsRegistry.getDeserializedValue(instabugLocale, Locale.class);
    }

    private void sendEvent(ReactApplicationContext reactContext,
                           String eventName,
                           WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("logLevelNone", LOG_LEVEL_NONE);
        constants.put("logLevelError", LOG_LEVEL_ERROR);
        constants.put("logLevelWarning", LOG_LEVEL_WARNING);
        constants.put("logLevelInfo", LOG_LEVEL_INFO);
        constants.put("logLevelDebug", LOG_LEVEL_DEBUG);
        constants.put("logLevelVerbose", LOG_LEVEL_VERBOSE);

        constants.put("invocationEventNone", INVOCATION_EVENT_NONE);
        constants.put("invocationEventShake", INVOCATION_EVENT_SHAKE);
        constants.put("invocationEventScreenshot", INVOCATION_EVENT_SCREENSHOT);
        constants.put("invocationEventTwoFingersSwipe", INVOCATION_EVENT_TWO_FINGERS_SWIPE);
        constants.put("invocationEventFloatingButton", INVOCATION_EVENT_FLOATING_BUTTON);

        constants.put("colorThemeLight", COLOR_THEME_LIGHT);
        constants.put("colorThemeDark", COLOR_THEME_DARK);

        constants.put("invocationModeNA", INVOCATION_MODE_NA);
        constants.put("invocationModeNewBug", INVOCATION_MODE_NEW_BUG);
        constants.put("invocationModeNewFeedback", INVOCATION_MODE_NEW_FEEDBACK);
        constants.put("invocationModeNewChat", INVOCATION_MODE_NEW_CHAT);
        constants.put("invocationModeChatsList", INVOCATION_MODE_CHATS_LIST);

        constants.put("floatingButtonEdgeLeft", FLOATING_BUTTON_EDGE_LEFT);
        constants.put("floatingButtonEdgeRight", FLOATING_BUTTON_EDGE_RIGHT);

        constants.put(BUG_REPORTING_REPORT_TYPE_BUG, BUG_REPORTING_REPORT_TYPE_BUG);
        constants.put(BUG_REPORTING_REPORT_TYPE_FEEDBACK, BUG_REPORTING_REPORT_TYPE_FEEDBACK);
        constants.put(BUG_REPORTING_REPORT_TYPE_QUESTION, BUG_REPORTING_REPORT_TYPE_QUESTION);

        constants.put("localeArabic", LOCALE_ARABIC);
        constants.put("localeAzerbaijani", LOCALE_AZERBAIJANI);
        constants.put("localeChineseSimplified", LOCALE_CHINESE_SIMPLIFIED);
        constants.put("localeChineseTraditional", LOCALE_CHINESE_TRADITIONAL);
        constants.put("localeCzech", LOCALE_CZECH);
        constants.put("localeDutch", LOCALE_DUTCH);
        constants.put("localeEnglish", LOCALE_ENGLISH);
        constants.put("localeFrench", LOCALE_FRENCH);
        constants.put("localeGerman", LOCALE_GERMAN);
        constants.put("localeKorean", LOCALE_KOREAN);
        constants.put("localeItalian", LOCALE_ITALIAN);
        constants.put("localeJapanese", LOCALE_JAPANESE);
        constants.put("localePolish", LOCALE_POLISH);
        constants.put("localePortugueseBrazil", LOCALE_PORTUGUESE_BRAZIL);
        constants.put("localeRussian", LOCALE_RUSSIAN);
        constants.put("localeSpanish", LOCALE_SPANISH);
        constants.put("localeSwedish", LOCALE_SWEDISH);
        constants.put("localeTurkish", LOCALE_TURKISH);

        constants.put("topRight", TOP_RIGHT);
        constants.put("topLeft", TOP_LEFT);
        constants.put("bottomRight", BOTTOM_RIGHT);
        constants.put("bottomLeft", BOTTOM_LEFT);

        constants.put("rectMinXEdge", FLOATING_BUTTON_EDGE_LEFT);
        constants.put("rectMaxXEdge", FLOATING_BUTTON_EDGE_RIGHT);

        constants.put("enabledWithRequiredFields", EXTENDED_BUG_REPORT_REQUIRED_FIELDS);
        constants.put("enabledWithOptionalFields", EXTENDED_BUG_REPORT_OPTIONAL_FIELDS);
        constants.put("disabled", EXTENDED_BUG_REPORT_DISABLED);

        constants.put("reproStepsEnabledWithNoScreenshots", ENABLED_WITH_NO_SCREENSHOTS);
        constants.put("reproStepsEnabled", ENABLED);
        constants.put("reproStepsDisabled", DISABLED);

        constants.put("welcomeMessageModeLive", WELCOME_MESSAGE_MODE_LIVE);
        constants.put("welcomeMessageModeBeta", WELCOME_MESSAGE_MODE_BETA);
        constants.put("welcomeMessageModeDisabled", WELCOME_MESSAGE_MODE_DISABLED);

        constants.put("allActions", ACTION_TYPE_ALL_ACTIONS);
        constants.put("reportBugAction", ACTION_TYPE_REPORT_BUG);
        constants.put("requestNewFeature", ACTION_TYPE_REQUEST_NEW_FEATURE);
        constants.put("addCommentToFeature", ACTION_TYPE_ADD_COMMENT_TO_FEATURE);

        //deprecated
        constants.put("emailFieldHidden", EMAIL_FIELD_HIDDEN);
        constants.put("emailFieldOptional", EMAIL_FIELD_OPTIONAL);
        constants.put("commentFieldRequired", COMMENT_FIELD_REQUIRED);
        constants.put("disablePostSendingDialog", DISABLE_POST_SENDING_DIALOG);
        //

        constants.put("optionEmailFieldHidden", EMAIL_FIELD_HIDDEN);
        constants.put("optionEmailFieldOptional", EMAIL_FIELD_OPTIONAL);
        constants.put("optionCommentFieldRequired", COMMENT_FIELD_REQUIRED);
        constants.put("optionDisablePostSendingDialog", DISABLE_POST_SENDING_DIALOG);

        constants.put("promptOptionBug", PROMPT_OPTION_BUG);
        constants.put("promptOptionChat", PROMPT_OPTION_CHAT);
        constants.put("promptOptionFeedback", PROMPT_OPTION_FEEDBACK);

        constants.put("shakeHint", SHAKE_HINT);
        constants.put("swipeHint", SWIPE_HINT);
        constants.put("invalidEmailMessage", INVALID_EMAIL_MESSAGE);
        constants.put("invalidCommentMessage", INVALID_COMMENT_MESSAGE);
        constants.put("emailFieldHint", EMAIL_FIELD_HINT);
        constants.put("commentFieldHintForBugReport", COMMENT_FIELD_HINT_FOR_BUG_REPORT);
        constants.put("commentFieldHintForFeedback", COMMENT_FIELD_HINT_FOR_FEEDBACK);
        constants.put("commentFieldHintForQuestion", COMMENT_FIELD_HINT_FOR_QUESTION);
        constants.put("invocationHeader", INVOCATION_HEADER);
        constants.put("startChats", START_CHATS);
        constants.put("reportQuestion", REPORT_QUESTION);
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
        constants.put("thankYouText", THANK_YOU_ALERT_TEXT);
        constants.put("video", VIDEO_PLAYER_TITLE);
        constants.put("conversationTextFieldHint", CONVERSATION_TEXT_FIELD_HINT);
        constants.put("thankYouAlertText", REPORT_SUCCESSFULLY_SENT);

        constants.put("welcomeMessageBetaWelcomeStepTitle", WELCOME_MESSAGE_BETA_WELCOME_STEP_TITLE);
        constants.put("welcomeMessageBetaWelcomeStepContent", WELCOME_MESSAGE_BETA_WELCOME_STEP_CONTENT);
        constants.put("welcomeMessageBetaHowToReportStepTitle", WELCOME_MESSAGE_HOW_TO_REPORT_STEP_TITLE);
        constants.put("welcomeMessageBetaHowToReportStepContent", WELCOME_MESSAGE_HOW_TO_REPORT_STEP_CONTENT);
        constants.put("welcomeMessageBetaFinishStepTitle", WELCOME_MESSAGE_FINISH_STEP_TITLE);
        constants.put("welcomeMessageBetaFinishStepContent", WELCOME_MESSAGE_FINISH_STEP_CONTENT);
        constants.put("welcomeMessageLiveWelcomeStepTitle", WELCOME_MESSAGE_LIVE_WELCOME_STEP_TITLE);
        constants.put("welcomeMessageLiveWelcomeStepContent", WELCOME_MESSAGE_LIVE_WELCOME_STEP_CONTENT);

        constants.put(CUSTOM_SURVEY_THANKS_TITLE, CUSTOM_SURVEY_THANKS_TITLE);
        constants.put(CUSTOM_SURVEY_THANKS_SUBTITLE, CUSTOM_SURVEY_THANKS_SUBTITLE);

        constants.put(STORE_RATING_THANKS_TITLE, STORE_RATING_THANKS_TITLE);
        constants.put(STORE_RATING_THANKS_SUBTITLE, STORE_RATING_THANKS_SUBTITLE);

        constants.put(REPORT_BUG_DESCRIPTION, REPORT_BUG_DESCRIPTION);
        constants.put(REPORT_FEEDBACK_DESCRIPTION, REPORT_FEEDBACK_DESCRIPTION);
        constants.put(REPORT_QUESTION_DESCRIPTION, REPORT_QUESTION_DESCRIPTION);
        constants.put(REQUEST_FEATURE_DESCRIPTION, REQUEST_FEATURE_DESCRIPTION);

        constants.put(REPORT_DISCARD_DIALOG_TITLE, REPORT_DISCARD_DIALOG_TITLE);
        constants.put(REPORT_DISCARD_DIALOG_BODY, REPORT_DISCARD_DIALOG_BODY);
        constants.put(REPORT_DISCARD_DIALOG_NEGATIVE_ACTION, REPORT_DISCARD_DIALOG_NEGATIVE_ACTION);
        constants.put(REPORT_DISCARD_DIALOG_POSITIVE_ACTION, REPORT_DISCARD_DIALOG_POSITIVE_ACTION);
        constants.put(REPORT_ADD_ATTACHMENT_HEADER, REPORT_ADD_ATTACHMENT_HEADER);

        return constants;
    }
}