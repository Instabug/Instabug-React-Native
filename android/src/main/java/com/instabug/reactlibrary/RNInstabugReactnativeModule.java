package com.instabug.reactlibrary;

import static com.instabug.apm.configuration.cp.APMFeature.APM_NETWORK_PLUGIN_INSTALLED;
import static com.instabug.apm.configuration.cp.APMFeature.CP_NATIVE_INTERCEPTION_ENABLED;
import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import android.app.Application;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;

import androidx.annotation.NonNull;
import androidx.annotation.UiThread;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.instabug.apm.InternalAPM;
import com.instabug.apm.configuration.cp.APMFeature;
import com.instabug.library.Feature;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.IssueType;
import com.instabug.library.LogLevel;
import com.instabug.library.ReproConfigurations;
import com.instabug.library.core.InstabugCore;
import com.instabug.library.internal.crossplatform.CoreFeature;
import com.instabug.library.internal.crossplatform.CoreFeaturesState;
import com.instabug.library.internal.crossplatform.FeaturesStateListener;
import com.instabug.library.internal.crossplatform.InternalCore;
import com.instabug.library.featuresflags.model.IBGFeatureFlag;
import com.instabug.library.internal.crossplatform.InternalCore;
import com.instabug.library.internal.crossplatform.OnFeaturesUpdatedListener;
import com.instabug.library.internal.module.InstabugLocale;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.logging.InstabugLog;
import com.instabug.library.model.IBGTheme;
import com.instabug.library.model.NetworkLog;
import com.instabug.library.model.Report;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.library.util.InstabugSDKLogger;
import com.instabug.reactlibrary.utils.ArrayUtil;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import com.instabug.reactlibrary.utils.RNTouchedViewExtractor;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.File;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Nullable;


/**
 * The type Rn instabug reactnative module.
 */
public class RNInstabugReactnativeModule extends EventEmitterModule {

    private static final String TAG = "IBG-RN-Core";

    private InstabugCustomTextPlaceHolder placeHolders;
    private static Report currentReport;
    private final ReactApplicationContext reactContext;

    /**
     * Instantiates a new Rn Instabug ReactNative module.
     *
     * @param reactContext the react context
     */
    public RNInstabugReactnativeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.reactContext = reactContext;

        //init placeHolders
        placeHolders = new InstabugCustomTextPlaceHolder();
    }

    @Override
    public String getName() {
        return "Instabug";
    }


    @ReactMethod
    public void addListener(String event) {
        super.addListener(event);
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        super.removeListeners(count);
    }

    /**
     * Enables or disables Instabug functionality.
     * @param isEnabled A boolean to enable/disable Instabug.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    if (isEnabled)
                        Instabug.enable();
                    else
                        Instabug.disable();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Initializes the SDK.
     *
     * @param token                 The token that identifies the app. You can find it on your dashboard.
     * @param invocationEventValues The events that invoke the SDK's UI.
     * @param logLevel              The level of detail in logs that you want to print.
     * @param codePushVersion       The Code Push version to be used for all reports.
     */
    @ReactMethod
    public void init(
            final String token,
            final ReadableArray invocationEventValues,
            final String logLevel,
            final boolean useNativeNetworkInterception,
            @Nullable final String codePushVersion,
            @Nullable final String appVariant,
            final ReadableMap map
    ) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                final RNTouchedViewExtractor rnTouchedViewExtractor = new RNTouchedViewExtractor();
                InstabugCore.setTouchedViewExtractorExtension(rnTouchedViewExtractor);
                final ArrayList<String> keys = ArrayUtil.parseReadableArrayOfStrings(invocationEventValues);
                final ArrayList<InstabugInvocationEvent> parsedInvocationEvents = ArgsRegistry.invocationEvents.getAll(keys);
                final InstabugInvocationEvent[] invocationEvents = parsedInvocationEvents.toArray(new InstabugInvocationEvent[0]);
                final int parsedLogLevel = ArgsRegistry.sdkLogLevels.getOrDefault(logLevel, LogLevel.ERROR);

                final Application application = (Application) reactContext.getApplicationContext();

                RNInstabug.Builder builder = new RNInstabug.Builder(application, token)
                        .setInvocationEvents(invocationEvents)
                        .setLogLevel(parsedLogLevel);

                if (map!=null&&map.hasKey("ignoreAndroidSecureFlag")) {
                    builder.ignoreFlagSecure(map.getBoolean("ignoreAndroidSecureFlag"));
                }

                if (codePushVersion != null) {
                    if (Instabug.isBuilt()) {
                        Instabug.setCodePushVersion(codePushVersion);
                    } else {
                        builder.setCodePushVersion(codePushVersion);
                    }
                }
                 if (appVariant != null) {
                            builder.setAppVariant(appVariant);
                    }
                builder.build();
            }
        });
    }

    @ReactMethod
    public void setCodePushVersion(@Nullable final String version) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.setCodePushVersion(version);
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
                    final InstabugLocale parsedLocale = ArgsRegistry.locales
                            .getOrDefault(instabugLocale, InstabugLocale.ENGLISH);
                    final Locale locale = new Locale(parsedLocale.getCode(), parsedLocale.getCountry());
                    Instabug.setLocale(locale);
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
     * Gets tags.
     *
     * @return all tags added
     * @see #resetTags()
     */
    @ReactMethod
    public void getTags(final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableArray tagsArray = Arguments.createArray();
                try {
                    ArrayList<String> tags = Instabug.getTags();
                    for (int i = 0; i < tags.size(); i++) {
                        tagsArray.pushString(tags.get(i));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                promise.resolve(tagsArray);
            }
        });
    }

    /**
     * Set the user identity.
     * Instabug will pre-fill the user email in reports.
     *
     * @param userEmail User's default email
     * @param userName  Username.
     * @param userId    User's ID
     */
    @ReactMethod
    public void identifyUser(
            final String userEmail,
            final String userName,
            @Nullable final String userId
    ) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    // The arguments get re-ordered here to match the API signature.
                    Instabug.identifyUser(userName, userEmail, userId);
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
    public void getUserAttribute(final String key, final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                String userAttribute = "";
                try {
                    userAttribute = Instabug.getUserAttribute(key);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                promise.resolve(userAttribute);
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
    public void getAllUserAttributes(final Promise promise) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                WritableMap writableMap = Arguments.createMap();
                try {
                    HashMap<String, String> map = Instabug.getAllUserAttributes();
                    for (HashMap.Entry<String, String> entry : map.entrySet()) {
                        writableMap.putString(entry.getKey(), entry.getValue());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                promise.resolve(writableMap);
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
                    final InstabugColorTheme colorTheme = ArgsRegistry.colorThemes
                            .getOrDefault(theme, InstabugColorTheme.InstabugColorThemeLight);
                    Instabug.setColorTheme(colorTheme);
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
                    final InstabugCustomTextPlaceHolder.Key parsedKey = ArgsRegistry.placeholders.get(key);
                    placeHolders.set(parsedKey, string);
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
    public void logUserEvent(final String name) {
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
                        sendEvent("IBGpreSendingHandler", reportParam);
                        currentReport = report;
                    }
                });
            }
        });
    }

    protected static void clearCurrentReport() {
        currentReport = null;
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

    private WritableMap convertFromHashMapToWriteableMap(HashMap hashMap) {
        WritableMap writableMap = new WritableNativeMap();
        for (int i = 0; i < hashMap.size(); i++) {
            Object key = hashMap.keySet().toArray()[i];
            Object value = hashMap.get(key);
            writableMap.putString((String) key, (String) value);
        }
        return writableMap;
    }

    private static JSONObject objectToJSONObject(Object object) {
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

        for (int i = 0; i < arrayList.size(); i++) {
            Object object = arrayList.get(i);

            if (object instanceof String) {
                writableArray.pushString((String) object);
            } else {
                JSONObject jsonObject = objectToJSONObject(object);
                writableArray.pushMap((WritableMap) jsonObject);
            }
        }

        return writableArray;

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

    @ReactMethod
    public void setReproStepsConfig(final String bugMode, final String crashMode, final String sessionReplayMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final Integer resolvedBugMode = ArgsRegistry.reproModes.get(bugMode);
                    final Integer resolvedCrashMode = ArgsRegistry.reproModes.get(crashMode);
                    final Integer resolvedSessionReplayMode = ArgsRegistry.reproModes.get(sessionReplayMode);

                    final ReproConfigurations config = new ReproConfigurations.Builder()
                            .setIssueMode(IssueType.Bug, resolvedBugMode)
                            .setIssueMode(IssueType.Crash, resolvedCrashMode)
                            .setIssueMode(IssueType.SessionReplay, resolvedSessionReplayMode)
                            .build();

                    Instabug.setReproConfigurations(config);
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
     *                           live, or beta.
     */
    @ReactMethod
    public void showWelcomeMessageWithMode(final String welcomeMessageMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final WelcomeMessage.State parsedState = ArgsRegistry.welcomeMessageStates
                            .getOrDefault(welcomeMessageMode, WelcomeMessage.State.LIVE);
                    Instabug.showWelcomeMessage(parsedState);
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
     *                           live, beta or disabled.
     */
    @ReactMethod
    public void setWelcomeMessageMode(final String welcomeMessageMode) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final WelcomeMessage.State parsedState = ArgsRegistry.welcomeMessageStates
                            .getOrDefault(welcomeMessageMode, WelcomeMessage.State.LIVE);
                    Instabug.setWelcomeMessageState(parsedState);
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

    @ReactMethod
    public void networkLogAndroid(final String url,
                                  final String requestBody,
                                  final String responseBody,
                                  final String method,
                                  final double responseCode,
                                  final String requestHeaders,
                                  final String responseHeaders,
                                  final double duration) {
        try {
            final String date = String.valueOf(System.currentTimeMillis());

            NetworkLog networkLog = new NetworkLog();
            networkLog.setDate(date);
            networkLog.setUrl(url);
            networkLog.setMethod(method);
            networkLog.setResponseCode((int) responseCode);
            networkLog.setTotalDuration((long) duration);

            try {
                networkLog.setRequest(requestBody);
                networkLog.setResponse(responseBody);
                networkLog.setRequestHeaders(requestHeaders);
                networkLog.setResponseHeaders(responseHeaders);
            } catch (OutOfMemoryError | Exception exception) {
                Log.d(TAG, "Error: " + exception.getMessage() + "while trying to set network log contents (request body, response body, request headers, and response headers).");
            }

            networkLog.insert();
        } catch (OutOfMemoryError | Exception exception) {
            Log.d(TAG, "Error: " + exception.getMessage() + "while trying to insert a network log");
        }
    }

    @UiThread
    @Nullable
    private View resolveReactView(final int reactTag) {
        final ReactApplicationContext reactContext = getReactApplicationContext();
        final UIManagerModule uiManagerModule = reactContext.getNativeModule(UIManagerModule.class);

        if (uiManagerModule == null) {
            return null;
        }

        return uiManagerModule.resolveView(reactTag);
    }


    @ReactMethod
    public void addPrivateView(final int reactTag) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final View view = resolveReactView(reactTag);

                    Instabug.addPrivateViews(view);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removePrivateView(final int reactTag) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    final View view = resolveReactView(reactTag);

                    Instabug.removePrivateViews(view);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Reports that the screen name been changed (Current View).
     *
     * @param screenName string containing the screen name
     */
    @ReactMethod
    public void reportCurrentViewChange(final String screenName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "reportCurrentViewChange", String.class);
                    if (method != null) {
                        method.invoke(null, screenName);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Reports that the screen has been changed (Repro Steps) the screen sent to this method will be the 'current view' on the dashboard
     *
     * @param screenName string containing the screen name
     */
    @ReactMethod
    public void reportScreenChange(final String screenName) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Method method = getMethod(Class.forName("com.instabug.library.Instabug"), "reportScreenChange", Bitmap.class, String.class);
                    if (method != null) {
                        method.invoke(null, null, screenName);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }



    @ReactMethod
    public void addFeatureFlags(final ReadableMap featureFlagsMap) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Iterator<Map.Entry<String, Object>> iterator = featureFlagsMap.getEntryIterator();
                    ArrayList<IBGFeatureFlag> featureFlags = new ArrayList<>();
                    while (iterator.hasNext()) {
                        Map.Entry<String, Object> item = iterator.next();
                        String variant = (String) item.getValue();
                        String name = item.getKey();
                        featureFlags.add(new IBGFeatureFlag(name, variant.isEmpty() ? null : variant));
                    }
                    if (!featureFlags.isEmpty()) {
                        Instabug.addFeatureFlags(featureFlags);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removeFeatureFlags(final ReadableArray featureFlags) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    ArrayList<String> stringArray = ArrayUtil.parseReadableArrayOfStrings(featureFlags);
                    Instabug.removeFeatureFlag(stringArray);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void removeAllFeatureFlags() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.removeAllFeatureFlags();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @ReactMethod
    public void willRedirectToStore() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    Instabug.willRedirectToStore();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Register a listener for feature flags value change
     */
    @ReactMethod
    public void registerFeatureFlagsChangeListener() {

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    InternalCore.INSTANCE._setFeaturesStateListener(new FeaturesStateListener() {
                        @Override
                        public void invoke(@NonNull CoreFeaturesState featuresState) {
                            WritableMap params = Arguments.createMap();
                            params.putBoolean("isW3ExternalTraceIDEnabled", featuresState.isW3CExternalTraceIdEnabled());
                            params.putBoolean("isW3ExternalGeneratedHeaderEnabled", featuresState.isAttachingGeneratedHeaderEnabled());
                            params.putBoolean("isW3CaughtHeaderEnabled", featuresState.isAttachingCapturedHeaderEnabled());
                            params.putInt("networkBodyLimit",featuresState.getNetworkLogCharLimit());

                            sendEvent(Constants.IBG_ON_FEATURE_FLAGS_UPDATE_RECEIVED_CALLBACK, params);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }

        });
    }


    /**
     * Get first time Value of W3ExternalTraceID flag
     */
    @ReactMethod
    public void isW3ExternalTraceIDEnabled(Promise promise) {

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalCore.INSTANCE._isFeatureEnabled(CoreFeature.W3C_EXTERNAL_TRACE_ID));
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
                }

            }

        });
    }


    /**
     * Get first time Value of W3ExternalGeneratedHeader flag
     */
    @ReactMethod
    public void isW3ExternalGeneratedHeaderEnabled(Promise promise) {

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalCore.INSTANCE._isFeatureEnabled(CoreFeature.W3C_ATTACHING_GENERATED_HEADER));
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
                }

            }

        });
    }

    /**
     * Get first time Value of W3CaughtHeader flag
     */
    @ReactMethod
    public void isW3CaughtHeaderEnabled(Promise promise) {

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalCore.INSTANCE._isFeatureEnabled(CoreFeature.W3C_ATTACHING_CAPTURED_HEADER));
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
                }

            }

        });
    }


    /**
     * Map between the exported JS constant and the arg key in {@link ArgsRegistry}.
     * The constant name and the arg key should match to be able to resolve the
     * constant with its actual value from the {@link ArgsRegistry} maps.
     *
     * This is a workaround, because RN cannot resolve enums in the constants map.
     */
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> args = ArgsRegistry.getAll();
        final Map<String, Object> constants = new HashMap<>();

        for (String key : args.keySet()) {
            constants.put(key, key);
        }

        return constants;
    }


    @ReactMethod
    public void setOnFeaturesUpdatedListener() {
        InternalCore.INSTANCE._setOnFeaturesUpdatedListener(new OnFeaturesUpdatedListener() {
            @Override
            public void invoke() {
                final boolean cpNativeInterceptionEnabled = InternalAPM._isFeatureEnabledCP(CP_NATIVE_INTERCEPTION_ENABLED, "");
                final boolean hasAPMPlugin = InternalAPM._isFeatureEnabledCP(APM_NETWORK_PLUGIN_INSTALLED, "");

                WritableMap params = Arguments.createMap();
                params.putBoolean("cpNativeInterceptionEnabled", cpNativeInterceptionEnabled);
                params.putBoolean("hasAPMPlugin", hasAPMPlugin);
                sendEvent(Constants.IBG_ON_FEATURES_UPDATED_CALLBACK, params);
            }
        });
    }
    /**
    * Enables or disables capturing network body.
    * @param isEnabled A boolean to enable/disable capturing network body.
    */
   @ReactMethod
   public void setNetworkLogBodyEnabled(final boolean isEnabled) {
       MainThreadHandler.runOnMainThread(new Runnable() {
           @Override
           public void run() {
               try {
                   Instabug.setNetworkLogBodyEnabled(isEnabled);
               } catch (Exception e) {
                   e.printStackTrace();
               }
           }
       });
   }

    /**
     * Sets the auto mask screenshots types.
     *
     * @param autoMaskingTypes The masking type to be applied.
     */
    @ReactMethod
    public void enableAutoMasking(@NonNull ReadableArray autoMaskingTypes) {
        MainThreadHandler.runOnMainThread(new Runnable() {

            @Override
            public void run() {
                int[] autoMassingTypesArray = new int[autoMaskingTypes.size()];
                for (int i = 0; i < autoMaskingTypes.size(); i++) {
                    String key = autoMaskingTypes.getString(i);

                    autoMassingTypesArray[i] = ArgsRegistry.autoMaskingTypes.get(key);

                }

                Instabug.setAutoMaskScreenshotsTypes(autoMassingTypesArray);
            }

        });
    }

    /**
     * Get network body size limit
     */
    @ReactMethod
    public void getNetworkBodyMaxSize(Promise promise) {

        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(InternalCore.INSTANCE.get_networkLogCharLimit());
                } catch (Exception e) {
                    e.printStackTrace();
                    promise.resolve(false);
                }
            }
        });
    }

     /**
         * Sets current App variant
         *
         * @param appVariant The app variant name .
         */
       @ReactMethod
        public void setAppVariant(@NonNull String appVariant) {
            try {
                Instabug.setAppVariant(appVariant);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    /**
     * Sets the theme for Instabug using a configuration object.
     *
     * @param themeConfig A ReadableMap containing theme properties such as colors, fonts, and text styles.
     */
    @ReactMethod
    public void setTheme(final ReadableMap themeConfig) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    com.instabug.library.model.IBGTheme.Builder builder = new com.instabug.library.model.IBGTheme.Builder();

                    // Apply colors
                    applyColorIfPresent(themeConfig, builder, "primaryColor", (themeBuilder, color) -> themeBuilder.setPrimaryColor(color));
                    applyColorIfPresent(themeConfig, builder, "secondaryTextColor", (themeBuilder, color) -> themeBuilder.setSecondaryTextColor(color));
                    applyColorIfPresent(themeConfig, builder, "primaryTextColor", (themeBuilder, color) -> themeBuilder.setPrimaryTextColor(color));
                    applyColorIfPresent(themeConfig, builder, "titleTextColor", (themeBuilder, color) -> themeBuilder.setTitleTextColor(color));
                    applyColorIfPresent(themeConfig, builder, "backgroundColor", (themeBuilder, color) -> themeBuilder.setBackgroundColor(color));

                    // Apply text styles
                    applyTextStyleIfPresent(themeConfig, builder, "primaryTextStyle", (themeBuilder, style) -> themeBuilder.setPrimaryTextStyle(style));
                    applyTextStyleIfPresent(themeConfig, builder, "secondaryTextStyle", (themeBuilder, style) -> themeBuilder.setSecondaryTextStyle(style));
                    applyTextStyleIfPresent(themeConfig, builder, "ctaTextStyle", (themeBuilder, style) -> themeBuilder.setCtaTextStyle(style));
                    setFontIfPresent(themeConfig, builder, "primaryFontPath", "primaryFontAsset", "primary");
                    setFontIfPresent(themeConfig, builder, "secondaryFontPath", "secondaryFontAsset", "secondary");
                    setFontIfPresent(themeConfig, builder, "ctaFontPath", "ctaFontAsset", "CTA");

                    IBGTheme theme = builder.build();
                    Instabug.setTheme(theme);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Retrieves a color value from the ReadableMap.
     *
     * @param map The ReadableMap object.
     * @param key The key to look for.
     * @return The parsed color as an integer, or black if missing or invalid.
     */
    private int getColor(ReadableMap map, String key) {
        try {
            if (map != null && map.hasKey(key) && !map.isNull(key)) {
                String colorString = map.getString(key);
                return Color.parseColor(colorString);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Color.BLACK;
    }

    /**
     * Retrieves a text style from the ReadableMap.
     *
     * @param map The ReadableMap object.
     * @param key The key to look for.
     * @return The corresponding Typeface style, or Typeface.NORMAL if missing or invalid.
     */
    private int getTextStyle(ReadableMap map, String key) {
        try {
            if (map != null && map.hasKey(key) && !map.isNull(key)) {
                String style = map.getString(key);
                switch (style.toLowerCase()) {
                    case "bold":
                        return Typeface.BOLD;
                    case "italic":
                        return Typeface.ITALIC;
                    case "bold_italic":
                        return Typeface.BOLD_ITALIC;
                    case "normal":
                    default:
                        return Typeface.NORMAL;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Typeface.NORMAL;
    }



    /**
     * Applies a color to the theme builder if present in the configuration.
     *
     * @param themeConfig The theme configuration map
     * @param builder The theme builder
     * @param key The configuration key
     * @param setter The color setter function
     */
    private void applyColorIfPresent(ReadableMap themeConfig, com.instabug.library.model.IBGTheme.Builder builder,
                                   String key, java.util.function.BiConsumer<com.instabug.library.model.IBGTheme.Builder, Integer> setter) {
        if (themeConfig.hasKey(key)) {
            int color = getColor(themeConfig, key);
            setter.accept(builder, color);
        }
    }

    /**
     * Applies a text style to the theme builder if present in the configuration.
     *
     * @param themeConfig The theme configuration map
     * @param builder The theme builder
     * @param key The configuration key
     * @param setter The text style setter function
     */
    private void applyTextStyleIfPresent(ReadableMap themeConfig, com.instabug.library.model.IBGTheme.Builder builder,
                                       String key, java.util.function.BiConsumer<com.instabug.library.model.IBGTheme.Builder, Integer> setter) {
        if (themeConfig.hasKey(key)) {
            int style = getTextStyle(themeConfig, key);
            setter.accept(builder, style);
        }
    }

    /**
     * Sets a font on the theme builder if the font configuration is present in the theme config.
     *
     * @param themeConfig The theme configuration map
     * @param builder The theme builder
     * @param fileKey The key for font file path
     * @param assetKey The key for font asset path
     * @param fontType The type of font (for logging purposes)
     */
    private void setFontIfPresent(ReadableMap themeConfig, com.instabug.library.model.IBGTheme.Builder builder,
                                 String fileKey, String assetKey, String fontType) {
        if (themeConfig.hasKey(fileKey) || themeConfig.hasKey(assetKey)) {
            Typeface typeface = getTypeface(themeConfig, fileKey, assetKey);
            if (typeface != null) {
                switch (fontType) {
                    case "primary":
                        builder.setPrimaryTextFont(typeface);
                        break;
                    case "secondary":
                        builder.setSecondaryTextFont(typeface);
                        break;
                    case "CTA":
                        builder.setCtaTextFont(typeface);
                        break;
                }
            } else {
                Log.e("InstabugModule", "Failed to load " + fontType + " font");
            }
        }
    }

    /**
     * Loads a Typeface from a file path.
     *
     * @param fileName The filename to load
     * @return The loaded Typeface or null if failed
     */
    private Typeface loadTypefaceFromFile(String fileName) {
        try {
            Typeface typeface = Typeface.create(fileName, Typeface.NORMAL);
            if (typeface != null && !typeface.equals(Typeface.DEFAULT)) {
                return typeface;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Loads a Typeface from assets.
     *
     * @param fileName The filename in assets/fonts/ directory
     * @return The loaded Typeface or null if failed
     */
    private Typeface loadTypefaceFromAssets(String fileName) {
        try {
            return Typeface.createFromAsset(getReactApplicationContext().getAssets(), "fonts/" + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Typeface getTypeface(ReadableMap map, String fileKey, String assetKey) {
        try {
            if (fileKey != null && map.hasKey(fileKey) && !map.isNull(fileKey)) {
                String fontPath = map.getString(fileKey);
                String fileName = getFileName(fontPath);

                // Try loading from file first
                Typeface typeface = loadTypefaceFromFile(fileName);
                if (typeface != null) {
                    return typeface;
                }

                // Try loading from assets
                typeface = loadTypefaceFromAssets(fileName);
                if (typeface != null) {
                    return typeface;
                }
            }

            if (assetKey != null && map.hasKey(assetKey) && !map.isNull(assetKey)) {
                String assetPath = map.getString(assetKey);
                String fileName = getFileName(assetPath);
                return loadTypefaceFromAssets(fileName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Typeface.DEFAULT;
    }

/**
 * Extracts the filename from a path, removing any directory prefixes.
 *
 * @param path The full path to the file
 * @return Just the filename with extension
 */
private String getFileName(String path) {
    if (path == null || path.isEmpty()) {
        return path;
    }

    int lastSeparator = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    if (lastSeparator >= 0 && lastSeparator < path.length() - 1) {
        return path.substring(lastSeparator + 1);
    }

    return path;
}

 /**
     * Enables or disables displaying in full-screen mode, hiding the status and navigation bars.
     * @param isEnabled A boolean to enable/disable setFullscreen.
     */
    @ReactMethod
    public void setFullscreen(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                        Instabug.setFullscreen(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
