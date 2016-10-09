/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { NativeModules } from 'react-native';

let {Instabug} = NativeModules;

module.exports = {
	startWithToken: function(toke, invocationEvent) {
		Instabug.startWithToken(token, invocationEvent);
	},

	invoke: function() {
		Instabug.invoke();
	},

	invokeWithInvocationMode: function(invocationMode) {
		Instabug.invokeWithInvocationMode(invocationMode);
	},

	dismiss: function () {
		Instabug.dismiss();
	},

	setFileAttachment: function(fileLocation) {
		Instabug.setFileAttachment(fileLocation);
	},

	setUserData: function(userData) {
		Instabug.setUserData(userData);
	},

	IBGLog: function(log) {
		Instabug.IBGLog(log);
	},

	setUserStepsEnabled: function(isUserStepsEnabled) {
		Instabug.setUserStepsEnabled(isUserStepsEnabled);
	},

	setPreSendingHandler: function(handler) {
		Instabug.setPreSendingHandler(handler);
	},

	setPreInvocationHandler: function(handler) {
		Instabug.setPreInvocationHandler(handler);
	},

	setPostInvocatioHandler: function(handler) {
		Instabug.setPostInvocatioHandler(handler);
	},

	showIntroMessage: function() {
		Instabug.showIntroMessage();
	},

	setUserEmail: function(userEmail) {
		Instabug.setUserEmail(userEmail);
	},

	setUserName: function(userName) {
		Instabug.setUserName(userName);
	},

	setWillSkipScreenshotAnnotation: function(willSkipeScreenshotAnnotation) {
		Instabug.setWillSkipScreenshotAnnotation(willSkipeScreenshotAnnotation);
	},

	getUnreadMessagesCount: function() {
		var count = 0;
		returnCallBack = function(response) {
			count = response;
		}

		Instabug.getUnreadMessagesCount(returnCallBack);

		return count;
	},

	setInvocationEvent: function(invocationEvent) {
		Instabug.setInvocationEvent(invocationEvent);
	},

	setPushNotificationsEnabled: function(isPushNotificationEnabled) {
		Instabug.setPushNotificationsEnabled(isPushNotificationEnabled);
	},

	setEmailFieldRequired: function(isEmailFieldRequired) {
		Instabug.setEmailFieldRequired(isEmailFieldRequired);
	},

	setCommentFieldRequired: function(isCommentFieldRequired) {
		Instabug.setCommentFieldRequired(isCommentFieldRequired);
	},

	setShakingThresholdForiPhone: function(iphoneThreshold, ipadThreshold) {
		Instabug.setShakingThresholdForiPhone(iphoneThreshold, ipadThreshold);
	},

	setFloatingButtonEdge: function(floatingButtonEdge, offsetFromTop) {
		Instabug.setFloatingButtonEdge(floatingButtonEdge, offsetFromTop);
	},

	setLocal: function(local) {
		Instabug.setLocal(local);
	},

	setIntroMessageEnabled: function(isIntroMessageEnabled) {
		Instabug.setIntroMessageEnabled(isIntroMessageEnabled);
	},

	setColorTheme: function(colorTheme) {
		Instabug.setColorTheme(colorTheme);
	},

	// Make sure to test it
	setPrimaryColor: function(primaryColor) {
		Instabug.setPrimaryColor(primaryColor);
	},

	addTags: function(tags) {
		Instabug.addTags(tags);
	},

	// TODO: research this: vvvv
	// + (void)setScreenshotCapturingHandler:(UIImage *(^)())screenshotCapturingHandler;

	resetTags: function () {
		Instabug.resetTags();
	},

	getTags: function() {
		var tags = [];
		returnCallBack = function(response) {
			tags = response;
		}

		Instabug.getUnreadMessagesCount(returnCallBack);

		return tags;
	},

	setStringToKey: function(string, key) {
		Instabug.setString(string, key);
	}

	replaceKeyWithString: function(string, key) {
		Instabug.setString(string, key);
	},

	// TODO: investigate doing it in more like JS pattern
	setAttachmentTypesEnabled: function(screenshot, extraScreenshot, galleryImage, screenRecording) {
		Instabug.setAttachmentTypesEnabledScreenShot(screenshot, extraScreenshot, galleryImage, screenRecording);
	},

	setChatNotificationEnabled: function(isChatNotificationEnabled) {
		Instabug.setChatNotificationEnabled(isChatNotificationEnabled);
	},

// TODO: investigate doing it in more like JS pattern
	setPromptOptions: function(isBugReportingEnabled, isFeedbackReportingEnabled, isChatEnabled) {
		Instabug.setPromptOptionsEnabledWithBug(isBugReportingEnabled, isFeedbackReportingEnabled, isChatEnabled);
	},

	isInstabugNotification: function(notification) {
		var ibgNotifcation = false;
		returnCallBack = function(response) {
			ibgNotifcation = response;
		}

		Instabug.isInstabugNotification(returnCallBack);

		return ibgNotifcation;
	},

	IBGConstants: {
		invocationEvent: {
			None: Instabug.invocationEventNone,
			Shake: Instabug.invocationEventShake,
			Screenshot: Instabug.invocationEventScreenshot,
			TwoFingersSwipe: Instabug.invocationEventTwoFingersSwipe,
			RightEdgePan: Instabug.invocationEventRightEdgePan,
			FloatingButton: Instabug.invocationEventFloatingButton
		},
		dismissType: {
			Submit: Instabug.dismissTypeSubmit,
			Cancel: Instabug.dismissTypeCancel,
			AddAttachment: Instabug.dismissTypeAddAttachment
		},
		reportType: {
			Bug: Instabug.reportTypeBug,
			Feedback: Instabug.reportTypeFeedback
		},
		invocationMode: {
			NA: Instabug.invocationModeNA,
			NewBug: Instabug.invocationModeNewBug,
			NewFeedback: Instabug.invocationModeNewFeedback,
			NewChat: Instabug.invocationModeNewChat,
			ChatsList: Instabug.invocationModeChatsList
		},
		local: {
			Arabic: Instabug.localArabic,
			ChineseSimplified: Instabug.localChineseSimplified,
			ChineseTraditional: Instabug.localChineseTraditional,
			Czech: Instabug.localCzech,
			Danish: Instabug.localDanish,
			English: Instabug.localEnglish,
			French: Instabug.localFrench,
			German: Instabug.localGerman,
			Italian: Instabug.localItalian,
			Japanese: Instabug.localJapanese,
			Polish: Instabug.localPolish,
			PortugueseBrazil: Instabug.localPortugueseBrazil,
			Russian: Instabug.localRussian,
			Spanish: Instabug.localSpanish,
			Swedish: Instabug.localSwedish,
			Turkish: Instabug.localTurkish
		},
		colorTheme: {
			Light: Instabug.colorThemeLight,
			Dark: Instabug.colorThemeDark
		}
	}
}