package com.instabug.reactlibrary;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import com.instabug.bug.BugReporting;
import com.instabug.bug.invocation.Option;
import com.instabug.library.ActionType;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.library.visualusersteps.State;

import static com.instabug.library.internal.module.InstabugLocale.ARABIC;
import static com.instabug.library.internal.module.InstabugLocale.CZECH;
import static com.instabug.library.internal.module.InstabugLocale.DANISH;
import static com.instabug.library.internal.module.InstabugLocale.ENGLISH;
import static com.instabug.library.internal.module.InstabugLocale.FRENCH;
import static com.instabug.library.internal.module.InstabugLocale.GERMAN;
import static com.instabug.library.internal.module.InstabugLocale.INDONESIAN;
import static com.instabug.library.internal.module.InstabugLocale.ITALIAN;
import static com.instabug.library.internal.module.InstabugLocale.JAPANESE;
import static com.instabug.library.internal.module.InstabugLocale.KOREAN;
import static com.instabug.library.internal.module.InstabugLocale.NETHERLANDS;
import static com.instabug.library.internal.module.InstabugLocale.NORWEGIAN;
import static com.instabug.library.internal.module.InstabugLocale.POLISH;
import static com.instabug.library.internal.module.InstabugLocale.PORTUGUESE_BRAZIL;
import static com.instabug.library.internal.module.InstabugLocale.PORTUGUESE_PORTUGAL;
import static com.instabug.library.internal.module.InstabugLocale.RUSSIAN;
import static com.instabug.library.internal.module.InstabugLocale.SIMPLIFIED_CHINESE;
import static com.instabug.library.internal.module.InstabugLocale.SLOVAK;
import static com.instabug.library.internal.module.InstabugLocale.SPANISH;
import static com.instabug.library.internal.module.InstabugLocale.SWEDISH;
import static com.instabug.library.internal.module.InstabugLocale.TRADITIONAL_CHINESE;
import static com.instabug.library.internal.module.InstabugLocale.TURKISH;
import static com.instabug.library.invocation.InstabugInvocationEvent.FLOATING_BUTTON;
import static com.instabug.library.invocation.InstabugInvocationEvent.NONE;
import static com.instabug.library.invocation.InstabugInvocationEvent.SCREENSHOT;
import static com.instabug.library.invocation.InstabugInvocationEvent.SHAKE;
import static com.instabug.library.invocation.InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT;
import static com.instabug.library.ui.onboarding.WelcomeMessage.State.BETA;
import static com.instabug.library.ui.onboarding.WelcomeMessage.State.DISABLED;
import static com.instabug.library.ui.onboarding.WelcomeMessage.State.LIVE;

@SuppressWarnings({"SameParameterValue", "unchecked"})
final class ArgsRegistry {

    static final Map<String, Object> ARGS = new HashMap<>();

    static {
        registerInstabugInvocationEventsArgs(ARGS);
        registerWelcomeMessageArgs(ARGS);
        registerColorThemeArgs(ARGS);
        registerLocaleArgs(ARGS);
        registerInvocationModeArgs(ARGS);
        registerInvocationOptionsArgs(ARGS);
        registerCustomTextPlaceHolderKeysArgs(ARGS);
        registerInstabugReportTypesArgs(ARGS);
        registerInstabugExtendedBugReportModeArgs(ARGS);
        registerInstabugActionTypesArgs(ARGS);
        registerInstabugVideoRecordingFloatingButtonPositionArgs(ARGS);
        registerInstabugReportTypesArgs(ARGS);
        registerReproStepsModeArgs(ARGS);
        registerWelcomeMessageArgs(ARGS);
        registerInstabugFeatureRequestsActionTypes(ARGS);
    }


    /**
     * This acts as a safe get() method.
     * It returns the queried value after deserialization if AND ONLY IF it passed the following assertions:
     * - {@code key} is not null
     * - {@code key} does exist in the registry
     * - The value assigned to the {@code key} is not null
     * - The value assigned to the {@code key} is assignable from and can be casted to {@code clazz}
     * (i.e. Foo value = getDeserializedValue("key", Foo.class))
     *
     * @param key   the key whose associated value is to be returned
     * @param clazz the type in which the value should be deserialized to
     * @return the value deserialized if all the assertions were successful, null otherwise
     */
    static <T> T getDeserializedValue(String key, Class<T> clazz) {
        if (key != null && ARGS.containsKey(key)) {
            Object constant = ARGS.get(key);
            if (constant != null && constant.getClass().isAssignableFrom(clazz)) {
                return (T) constant;
            }
        }
        return null;
    }

    /**
     * This acts as a safe get() method.
     * It returns the queried raw value if AND ONLY IF it passed the following assertions:
     * - {@code key} is not null
     * - {@code key} does exist in the registry
     * (i.e. Object value = getRawValue("key")
     *
     * @param key the key whose associated value is to be returned
     * @return the value  if all the assertions were successful, null otherwise
     */
    static Object getRawValue(String key) {
        if (key != null) {
            return ARGS.get(key);
        }
        return null;
    }

    static void registerInstabugInvocationEventsArgs(Map<String, Object> args) {
        args.put("invocationEventTwoFingersSwipe", TWO_FINGER_SWIPE_LEFT);
        args.put("invocationEventFloatingButton", FLOATING_BUTTON);
        args.put("invocationEventScreenshot", SCREENSHOT);
        args.put("invocationEventShake", SHAKE);
        args.put("invocationEventNone", NONE);
    }

    static void registerWelcomeMessageArgs(Map<String, Object> args) {
        args.put("welcomeMessageModeDisabled", DISABLED);
        args.put("welcomeMessageModeLive", LIVE);
        args.put("welcomeMessageModeBeta", BETA);
    }

    static void registerColorThemeArgs(Map<String, Object> args) {
        args.put("colorThemeLight", InstabugColorTheme.InstabugColorThemeLight);
        args.put("colorThemeDark", InstabugColorTheme.InstabugColorThemeDark);
    }

    static void registerInvocationModeArgs(Map<String, Object> args) {
        args.put("invocationModeNewBug", BugReporting.ReportType.BUG);
        args.put("invocationModeNewFeedback", BugReporting.ReportType.FEEDBACK);
    }

    static void registerInvocationOptionsArgs(Map<String, Object> args) {
        args.put("commentFieldRequired", Option.COMMENT_FIELD_REQUIRED);
        args.put("disablePostSendingDialog", Option.DISABLE_POST_SENDING_DIALOG);
        args.put("emailFieldHidden", Option.EMAIL_FIELD_HIDDEN);
        args.put("emailFieldOptional", Option.EMAIL_FIELD_OPTIONAL);
    }

    static void registerLocaleArgs(Map<String, Object> args) {
        args.put("chineseTraditional", new Locale(TRADITIONAL_CHINESE.getCode(), TRADITIONAL_CHINESE.getCountry()));
        args.put("portuguesePortugal", new Locale(PORTUGUESE_PORTUGAL.getCode(), PORTUGUESE_PORTUGAL.getCountry()));
        args.put("chineseSimplified", new Locale(SIMPLIFIED_CHINESE.getCode(), SIMPLIFIED_CHINESE.getCountry()));
        args.put("portugueseBrazil", new Locale(PORTUGUESE_BRAZIL.getCode(), PORTUGUESE_BRAZIL.getCountry()));
        args.put("indonesian", new Locale(INDONESIAN.getCode(), INDONESIAN.getCountry()));
        args.put("dutch", new Locale(NETHERLANDS.getCode(), NETHERLANDS.getCountry()));
        args.put("norwegian", new Locale(NORWEGIAN.getCode(), NORWEGIAN.getCountry()));
        args.put("japanese", new Locale(JAPANESE.getCode(), JAPANESE.getCountry()));
        args.put("english", new Locale(ENGLISH.getCode(), ENGLISH.getCountry()));
        args.put("italian", new Locale(ITALIAN.getCode(), ITALIAN.getCountry()));
        args.put("russian", new Locale(RUSSIAN.getCode(), RUSSIAN.getCountry()));
        args.put("spanish", new Locale(SPANISH.getCode(), SPANISH.getCountry()));
        args.put("swedish", new Locale(SWEDISH.getCode(), SWEDISH.getCountry()));
        args.put("turkish", new Locale(TURKISH.getCode(), TURKISH.getCountry()));
        args.put("arabic", new Locale(ARABIC.getCode(), ARABIC.getCountry()));
        args.put("danish", new Locale(DANISH.getCode(), DANISH.getCountry()));
        args.put("french", new Locale(FRENCH.getCode(), FRENCH.getCountry()));
        args.put("german", new Locale(GERMAN.getCode(), GERMAN.getCountry()));
        args.put("korean", new Locale(KOREAN.getCode(), KOREAN.getCountry()));
        args.put("polish", new Locale(POLISH.getCode(), POLISH.getCountry()));
        args.put("slovak", new Locale(SLOVAK.getCode(), SLOVAK.getCountry()));
        args.put("czech", new Locale(CZECH.getCode(), CZECH.getCountry()));
    }

    static void registerCustomTextPlaceHolderKeysArgs(Map<String, Object> args) {
        args.put("shakeHint", InstabugCustomTextPlaceHolder.Key.SHAKE_HINT);
        args.put("swipeHint", InstabugCustomTextPlaceHolder.Key.SWIPE_HINT);
        args.put("invalidEmailMessage", InstabugCustomTextPlaceHolder.Key.INVALID_EMAIL_MESSAGE);
        args.put("invalidCommentMessage", InstabugCustomTextPlaceHolder.Key.INVALID_COMMENT_MESSAGE);
        args.put("invocationHeader", InstabugCustomTextPlaceHolder.Key.INVOCATION_HEADER);
        args.put("startChats", InstabugCustomTextPlaceHolder.Key.START_CHATS);
        args.put("reportBug", InstabugCustomTextPlaceHolder.Key.REPORT_BUG);
        args.put("reportFeedback", InstabugCustomTextPlaceHolder.Key.REPORT_FEEDBACK);
        args.put("emailFieldHint", InstabugCustomTextPlaceHolder.Key.EMAIL_FIELD_HINT);
        args.put("commentFieldHintForBugReport", InstabugCustomTextPlaceHolder.Key.COMMENT_FIELD_HINT_FOR_BUG_REPORT);
        args.put("commentFieldHintForFeedback", InstabugCustomTextPlaceHolder.Key.COMMENT_FIELD_HINT_FOR_FEEDBACK);
        args.put("commentFieldHintForQuestion", InstabugCustomTextPlaceHolder.Key.COMMENT_FIELD_HINT_FOR_QUESTION);
        args.put("addVoiceMessage", InstabugCustomTextPlaceHolder.Key.ADD_VOICE_MESSAGE);
        args.put("addImageFromGallery", InstabugCustomTextPlaceHolder.Key.ADD_IMAGE_FROM_GALLERY);
        args.put("addExtraScreenshot", InstabugCustomTextPlaceHolder.Key.ADD_EXTRA_SCREENSHOT);
        args.put("conversationsListTitle", InstabugCustomTextPlaceHolder.Key.CONVERSATIONS_LIST_TITLE);
        args.put("audioRecordingPermissionDenied", InstabugCustomTextPlaceHolder.Key.AUDIO_RECORDING_PERMISSION_DENIED);
        args.put("conversationTextFieldHint", InstabugCustomTextPlaceHolder.Key.CONVERSATION_TEXT_FIELD_HINT);
//        args.put("bugReportHeader", InstabugCustomTextPlaceHolder.Key.BUG_REPORT_HEADER);
//        args.put("feedbackReportHeader", InstabugCustomTextPlaceHolder.Key.FEEDBACK_REPORT_HEADER);
        args.put("voiceMessagePressAndHoldToRecord", InstabugCustomTextPlaceHolder.Key.VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD);
        args.put("voiceMessageReleaseToAttach", InstabugCustomTextPlaceHolder.Key.VOICE_MESSAGE_RELEASE_TO_ATTACH);
        args.put("reportSuccessfullySent", InstabugCustomTextPlaceHolder.Key.REPORT_SUCCESSFULLY_SENT);
        args.put("successDialogHeader", InstabugCustomTextPlaceHolder.Key.SUCCESS_DIALOG_HEADER);
        args.put("addVideoMessage", InstabugCustomTextPlaceHolder.Key.ADD_VIDEO);
        args.put("betaWelcomeMessageWelcomeStepTitle", InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_WELCOME_STEP_TITLE);
        args.put("betaWelcomeMessageWelcomeStepContent", InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_WELCOME_STEP_CONTENT);
        args.put("betaWelcomeMessageHowToReportStepTitle", InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_HOW_TO_REPORT_STEP_TITLE);
        args.put("betaWelcomeMessageHowToReportStepContent", InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_HOW_TO_REPORT_STEP_CONTENT);
        args.put("betaWelcomeMessageFinishStepTitle", InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_FINISH_STEP_TITLE);
        args.put("betaWelcomeMessageFinishStepContent", InstabugCustomTextPlaceHolder.Key.BETA_WELCOME_MESSAGE_FINISH_STEP_CONTENT);
        args.put("liveWelcomeMessageTitle", InstabugCustomTextPlaceHolder.Key.LIVE_WELCOME_MESSAGE_TITLE);
        args.put("liveWelcomeMessageContent", InstabugCustomTextPlaceHolder.Key.LIVE_WELCOME_MESSAGE_CONTENT);
    }

    static void registerInstabugReportTypesArgs(Map<String, Object> args) {
        args.put("bugReportingReportTypeBug", BugReporting.ReportType.BUG);
        args.put("bugReportingReportTypeFeedback", BugReporting.ReportType.FEEDBACK);
        args.put("bugReportingReportTypeQuestion", BugReporting.ReportType.QUESTION);
    }

    static void registerInstabugExtendedBugReportModeArgs(Map<String, Object> args) {
        args.put("enabledWithRequiredFields", ExtendedBugReport.State.ENABLED_WITH_REQUIRED_FIELDS);
        args.put("enabledWithOptionalFields", ExtendedBugReport.State.ENABLED_WITH_OPTIONAL_FIELDS);
        args.put("disabledExtendedBugReportState", ExtendedBugReport.State.DISABLED);
    }

    static void registerInstabugActionTypesArgs(Map<String, Object> args) {
        args.put("ActionType.allActions", ActionType.ALL_ACTIONS);
        args.put("ActionType.reportBug", ActionType.REPORT_BUG);
        args.put("ActionType.requestNewFeature", ActionType.REQUEST_NEW_FEATURE);
        args.put("ActionType.addCommentToFeature", ActionType.ADD_COMMENT_TO_FEATURE);
    }

    static void registerInstabugVideoRecordingFloatingButtonPositionArgs(Map<String, Object> args) {
        args.put("topRight", InstabugVideoRecordingButtonPosition.TOP_RIGHT);
        args.put("topLeft", InstabugVideoRecordingButtonPosition.TOP_LEFT);
        args.put("bottomRight", InstabugVideoRecordingButtonPosition.BOTTOM_RIGHT);
        args.put("bottomLeft", InstabugVideoRecordingButtonPosition.BOTTOM_LEFT);
    }

    static void registerReproStepsModeArgs(Map<String, Object> args) {
        args.put("enabledWithNoScreenshots", State.ENABLED_WITH_NO_SCREENSHOTS);
        args.put("enabled", State.ENABLED);
        args.put("disabled", State.DISABLED);
    }

    static void registerInstabugFeatureRequestsActionTypes(Map<String, Object> args) {
        args.put("requestNewFeature", com.instabug.featuresrequest.ActionType.REQUEST_NEW_FEATURE);
        args.put("addCommentToFeature", com.instabug.featuresrequest.ActionType.ADD_COMMENT_TO_FEATURE);
    }
}
