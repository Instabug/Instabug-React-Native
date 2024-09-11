package com.instabug.reactlibrary;

import androidx.annotation.NonNull;

import com.instabug.bug.BugReporting;
import com.instabug.bug.invocation.Option;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.featuresrequest.ActionType;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.InstabugCustomTextPlaceHolder.Key;
import com.instabug.library.OnSdkDismissCallback.DismissType;
import com.instabug.library.ReproMode;
import com.instabug.library.extendedbugreport.ExtendedBugReport;
import com.instabug.library.internal.module.InstabugLocale;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.library.invocation.util.InstabugFloatingButtonEdge;
import com.instabug.library.invocation.util.InstabugVideoRecordingButtonPosition;
import com.instabug.library.sessionreplay.model.SessionMetadata;
import com.instabug.library.ui.onboarding.WelcomeMessage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

final class ArgsRegistry {

    static class ArgsMap<T> extends HashMap<String, T> {
        @NonNull
        @Override
        public T getOrDefault(Object key, T defaultValue) {
            final T value = get(key);
            return value != null ? value : defaultValue;
        }

        public ArrayList<T> getAll(ArrayList<String> keys) {
            final ArrayList<T> values = new ArrayList<>();
            for (String key : keys) {
                values.add(get(key));
            }
            return values;
        }
    }

    @SuppressWarnings("deprecation")
    static Map<String, Object> getAll() {
        return new HashMap<String, Object>() {{
            putAll(invocationEvents);
            putAll(invocationOptions);
            putAll(colorThemes);
            putAll(floatingButtonEdges);
            putAll(recordButtonPositions);
            putAll(welcomeMessageStates);
            putAll(reportTypes);
            putAll(dismissTypes);
            putAll(actionTypes);
            putAll(extendedBugReportStates);
            putAll(reproModes);
            putAll(sdkLogLevels);
            putAll(nonFatalExceptionLevel);
            putAll(locales);
            putAll(placeholders);
            putAll(launchType);
        }};
    }

    public static ArgsMap<IBGNonFatalException.Level> nonFatalExceptionLevel = new ArgsMap<IBGNonFatalException.Level>() {{
        put("nonFatalErrorLevelCritical", IBGNonFatalException.Level.CRITICAL);
        put("nonFatalErrorLevelError", IBGNonFatalException.Level.ERROR);
        put("nonFatalErrorLevelWarning", IBGNonFatalException.Level.WARNING);
        put("nonFatalErrorLevelInfo", IBGNonFatalException.Level.INFO);
    }};

    static ArgsMap<InstabugInvocationEvent> invocationEvents = new ArgsMap<InstabugInvocationEvent>() {{
        put("invocationEventNone", InstabugInvocationEvent.NONE);
        put("invocationEventShake", InstabugInvocationEvent.SHAKE);
        put("invocationEventFloatingButton", InstabugInvocationEvent.FLOATING_BUTTON);
        put("invocationEventScreenshot", InstabugInvocationEvent.SCREENSHOT);
        put("invocationEventTwoFingersSwipeLeft", InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT);
    }};

    static final ArgsMap<Integer> invocationOptions = new ArgsMap<Integer>() {{
        put("optionEmailFieldHidden", Option.EMAIL_FIELD_HIDDEN);
        put("optionEmailFieldOptional", Option.EMAIL_FIELD_OPTIONAL);
        put("optionCommentFieldRequired", Option.COMMENT_FIELD_REQUIRED);
        put("optionDisablePostSendingDialog", Option.DISABLE_POST_SENDING_DIALOG);
    }};

    static final ArgsMap<InstabugColorTheme> colorThemes = new ArgsMap<InstabugColorTheme>() {{
        put("colorThemeLight", InstabugColorTheme.InstabugColorThemeLight);
        put("colorThemeDark", InstabugColorTheme.InstabugColorThemeDark);
    }};

    static final ArgsMap<InstabugFloatingButtonEdge> floatingButtonEdges = new ArgsMap<InstabugFloatingButtonEdge>() {{
        put("left", InstabugFloatingButtonEdge.LEFT);
        put("right", InstabugFloatingButtonEdge.RIGHT);
        put("floatingButtonEdgeLeft", InstabugFloatingButtonEdge.LEFT);
        put("floatingButtonEdgeRight", InstabugFloatingButtonEdge.RIGHT);
        put("rectMinXEdge", InstabugFloatingButtonEdge.LEFT);
        put("rectMaxXEdge", InstabugFloatingButtonEdge.RIGHT);
    }};

    static ArgsMap<InstabugVideoRecordingButtonPosition> recordButtonPositions = new ArgsMap<InstabugVideoRecordingButtonPosition>() {{
        put("topLeft", InstabugVideoRecordingButtonPosition.TOP_LEFT);
        put("topRight", InstabugVideoRecordingButtonPosition.TOP_RIGHT);
        put("bottomLeft", InstabugVideoRecordingButtonPosition.BOTTOM_LEFT);
        put("bottomRight", InstabugVideoRecordingButtonPosition.BOTTOM_RIGHT);
    }};

    static ArgsMap<WelcomeMessage.State> welcomeMessageStates = new ArgsMap<WelcomeMessage.State>() {{
        put("welcomeMessageModeLive", WelcomeMessage.State.LIVE);
        put("welcomeMessageModeBeta", WelcomeMessage.State.BETA);
        put("welcomeMessageModeDisabled", WelcomeMessage.State.DISABLED);
    }};

    static final ArgsMap<Integer> reportTypes = new ArgsMap<Integer>() {{
        put("bugReportingReportTypeBug", BugReporting.ReportType.BUG);
        put("bugReportingReportTypeFeedback", BugReporting.ReportType.FEEDBACK);
        put("bugReportingReportTypeQuestion", BugReporting.ReportType.QUESTION);
    }};

    static final ArgsMap<DismissType> dismissTypes = new ArgsMap<DismissType>() {{
        put("dismissTypeSubmit", DismissType.SUBMIT);
        put("dismissTypeCancel", DismissType.CANCEL);
        put("dismissTypeAddAttachment", DismissType.ADD_ATTACHMENT);
    }};

    static final ArgsMap<Integer> actionTypes = new ArgsMap<Integer>() {{
        put("allActions", ActionType.REQUEST_NEW_FEATURE | ActionType.ADD_COMMENT_TO_FEATURE);
        put("requestNewFeature", ActionType.REQUEST_NEW_FEATURE);
        put("addCommentToFeature", ActionType.ADD_COMMENT_TO_FEATURE);
    }};

    static ArgsMap<ExtendedBugReport.State> extendedBugReportStates = new ArgsMap<ExtendedBugReport.State>() {{
        put("enabledWithRequiredFields", ExtendedBugReport.State.ENABLED_WITH_REQUIRED_FIELDS);
        put("enabledWithOptionalFields", ExtendedBugReport.State.ENABLED_WITH_OPTIONAL_FIELDS);
        put("disabled", ExtendedBugReport.State.DISABLED);
    }};

    static final ArgsMap<Integer> reproModes = new ArgsMap<Integer>() {{
        put("reproStepsEnabledWithNoScreenshots", ReproMode.EnableWithNoScreenshots);
        put("reproStepsEnabled", ReproMode.EnableWithScreenshots);
        put("reproStepsDisabled", ReproMode.Disable);
    }};

    static final ArgsMap<Integer> sdkLogLevels = new ArgsMap<Integer>() {{
        put("sdkDebugLogsLevelNone", com.instabug.library.LogLevel.NONE);
        put("sdkDebugLogsLevelError", com.instabug.library.LogLevel.ERROR);
        put("sdkDebugLogsLevelDebug", com.instabug.library.LogLevel.DEBUG);
        put("sdkDebugLogsLevelVerbose", com.instabug.library.LogLevel.VERBOSE);
    }};

    static final ArgsMap<InstabugLocale> locales = new ArgsMap<InstabugLocale>() {{
        put("localeArabic", InstabugLocale.ARABIC);
        put("localeAzerbaijani", InstabugLocale.AZERBAIJANI);
        put("localeChineseSimplified", InstabugLocale.SIMPLIFIED_CHINESE);
        put("localeChineseTraditional", InstabugLocale.TRADITIONAL_CHINESE);
        put("localeCzech", InstabugLocale.CZECH);
        put("localeDanish", InstabugLocale.DANISH);
        put("localeDutch", InstabugLocale.NETHERLANDS);
        put("localeEnglish", InstabugLocale.ENGLISH);
        put("localeFrench", InstabugLocale.FRENCH);
        put("localeGerman", InstabugLocale.GERMAN);
        put("localeIndonesian", InstabugLocale.INDONESIAN);
        put("localeItalian", InstabugLocale.ITALIAN);
        put("localeJapanese", InstabugLocale.JAPANESE);
        put("localeKorean", InstabugLocale.KOREAN);
        put("localeNorwegian", InstabugLocale.NORWEGIAN);
        put("localePolish", InstabugLocale.POLISH);
        put("localePortugueseBrazil", InstabugLocale.PORTUGUESE_BRAZIL);
        put("localePortuguesePortugal", InstabugLocale.PORTUGUESE_PORTUGAL);
        put("localeRomanian", InstabugLocale.ROMANIAN);
        put("localeRussian", InstabugLocale.RUSSIAN);
        put("localeSpanish", InstabugLocale.SPANISH);
        put("localeSlovak", InstabugLocale.SLOVAK);
        put("localeSwedish", InstabugLocale.SWEDISH);
        put("localeTurkish", InstabugLocale.TURKISH);
    }};

    static final ArgsMap<Key> placeholders = new ArgsMap<Key>() {{
        put("shakeHint", Key.SHAKE_HINT);
        put("swipeHint", Key.SWIPE_HINT);
        put("invalidEmailMessage", Key.INVALID_EMAIL_MESSAGE);
        put("emailFieldHint", Key.EMAIL_FIELD_HINT);
        put("commentFieldHintForBugReport", Key.COMMENT_FIELD_HINT_FOR_BUG_REPORT);
        put("commentFieldHintForFeedback", Key.COMMENT_FIELD_HINT_FOR_FEEDBACK);
        put("commentFieldHintForQuestion", Key.COMMENT_FIELD_HINT_FOR_QUESTION);
        put("invocationHeader", Key.INVOCATION_HEADER);
        put("reportQuestion", Key.REPORT_QUESTION);
        put("reportBug", Key.REPORT_BUG);
        put("reportFeedback", Key.REPORT_FEEDBACK);
        put("conversationsHeaderTitle", Key.CONVERSATIONS_LIST_TITLE);
        put("addVoiceMessage", Key.ADD_VOICE_MESSAGE);
        put("addImageFromGallery", Key.ADD_IMAGE_FROM_GALLERY);
        put("addExtraScreenshot", Key.ADD_EXTRA_SCREENSHOT);
        put("addVideoMessage", Key.ADD_VIDEO);
        put("audioRecordingPermissionDeniedMessage", Key.AUDIO_RECORDING_PERMISSION_DENIED);
        put("recordingMessageToHoldText", Key.VOICE_MESSAGE_PRESS_AND_HOLD_TO_RECORD);
        put("recordingMessageToReleaseText", Key.VOICE_MESSAGE_RELEASE_TO_ATTACH);
        put("thankYouText", Key.SUCCESS_DIALOG_HEADER);
        put("videoPressRecord", Key.VIDEO_RECORDING_FAB_BUBBLE_HINT);
        put("conversationTextFieldHint", Key.CONVERSATION_TEXT_FIELD_HINT);
        put("thankYouAlertText", Key.REPORT_SUCCESSFULLY_SENT);

        put("welcomeMessageBetaWelcomeStepTitle", Key.BETA_WELCOME_MESSAGE_WELCOME_STEP_TITLE);
        put("welcomeMessageBetaWelcomeStepContent", Key.BETA_WELCOME_MESSAGE_WELCOME_STEP_CONTENT);
        put("welcomeMessageBetaHowToReportStepTitle", Key.BETA_WELCOME_MESSAGE_HOW_TO_REPORT_STEP_TITLE);
        put("welcomeMessageBetaHowToReportStepContent", Key.BETA_WELCOME_MESSAGE_HOW_TO_REPORT_STEP_CONTENT);
        put("welcomeMessageBetaFinishStepTitle", Key.BETA_WELCOME_MESSAGE_FINISH_STEP_TITLE);
        put("welcomeMessageBetaFinishStepContent", Key.BETA_WELCOME_MESSAGE_FINISH_STEP_CONTENT);
        put("welcomeMessageLiveWelcomeStepTitle", Key.LIVE_WELCOME_MESSAGE_TITLE);
        put("welcomeMessageLiveWelcomeStepContent", Key.LIVE_WELCOME_MESSAGE_CONTENT);

        put("surveysStoreRatingThanksTitle", Key.SURVEYS_STORE_RATING_THANKS_TITLE);
        put("surveysStoreRatingThanksSubtitle", Key.SURVEYS_STORE_RATING_THANKS_SUBTITLE);

        put("reportBugDescription", Key.REPORT_BUG_DESCRIPTION);
        put("reportFeedbackDescription", Key.REPORT_FEEDBACK_DESCRIPTION);
        put("reportQuestionDescription", Key.REPORT_QUESTION_DESCRIPTION);
        put("requestFeatureDescription", Key.REQUEST_FEATURE_DESCRIPTION);

        put("discardAlertTitle", Key.REPORT_DISCARD_DIALOG_TITLE);
        put("discardAlertMessage", Key.REPORT_DISCARD_DIALOG_BODY);
        put("discardAlertStay", Key.REPORT_DISCARD_DIALOG_NEGATIVE_ACTION);
        put("discardAlertDiscard", Key.REPORT_DISCARD_DIALOG_POSITIVE_ACTION);

        put("addAttachmentButtonTitleStringName", Key.REPORT_ADD_ATTACHMENT_HEADER);

        put("reportReproStepsDisclaimerBody", Key.REPORT_REPRO_STEPS_DISCLAIMER_BODY);
        put("reportReproStepsDisclaimerLink", Key.REPORT_REPRO_STEPS_DISCLAIMER_LINK);
        put("reproStepsProgressDialogBody", Key.REPRO_STEPS_PROGRESS_DIALOG_BODY);
        put("reproStepsListHeader", Key.REPRO_STEPS_LIST_HEADER);
        put("reproStepsListDescription", Key.REPRO_STEPS_LIST_DESCRIPTION);
        put("reproStepsListEmptyStateDescription", Key.REPRO_STEPS_LIST_EMPTY_STATE_DESCRIPTION);
        put("reproStepsListItemNumberingTitle", Key.REPRO_STEPS_LIST_ITEM_NUMBERING_TITLE);
        put("okButtonTitle", Key.BUG_ATTACHMENT_DIALOG_OK_BUTTON);
        put("audio", Key.CHATS_TYPE_AUDIO);
        put("image", Key.CHATS_TYPE_IMAGE);
        put("screenRecording", Key.CHATS_TYPE_VIDEO);
        put("messagesNotificationAndOthers", Key.CHATS_MULTIPLE_MESSAGE_NOTIFICATION);
        put("team", Key.CHATS_TEAM_STRING_NAME);
        put("insufficientContentMessage", Key.COMMENT_FIELD_INSUFFICIENT_CONTENT);
    }};

    public static ArgsMap<String> launchType = new ArgsMap<String>() {{
        put("cold", SessionMetadata.LaunchType.COLD);
        put("hot",SessionMetadata.LaunchType.HOT );
        put("warm",SessionMetadata.LaunchType.WARM );
    }};
    
// Temporary workaround to be removed in future release
    public static HashMap<String,String> launchTypeReversed = new HashMap<String,String>() {{
        put(SessionMetadata.LaunchType.COLD,"cold");
        put(SessionMetadata.LaunchType.HOT,"hot" );
        put(SessionMetadata.LaunchType.WARM,"warm" );
    }};

}
