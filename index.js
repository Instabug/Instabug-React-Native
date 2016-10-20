/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { NativeModules, NativeAppEventEmitter, Platform } from 'react-native';

let {Instabug} = NativeModules;

/**
 * Instabug
 * @exports Instabug
 */
module.exports = {

	/**
	 * Starts the SDK.
	 * This is the main SDK method that does all the magic. This is the only
	 * method that SHOULD be called.
	 * Should be called in constructor of the app registery component
	 * @param {string} token The token that identifies the app, you can find
	 * it on your dashboard.
	 * @param {invocationEvent} invocationEvent The event that invokes
	 * the SDK's UI.
	 */
	startWithToken: function(token, invocationEvent) {
			Instabug.startWithToken(token, invocationEvent);
	},

	/**
	* Invokes the SDK manually with the default invocation mode.
	* Shows a view that asks the user whether they want to start a chat, report
	* a problem or suggest an improvement.
	*/
	invoke: function() {
		Instabug.invoke();
	},

	/**
	* Invokes the SDK with a specific mode.
	* Invokes the SDK and show a specific view, instead of showing a prompt for
	* users to choose from.
	* @param {invocationMode} invocationMode Specifies which mode the
	* SDK is going to start with.
	*/
	invokeWithInvocationMode: function(invocationMode) {
		Instabug.invokeWithInvocationMode(invocationMode);
	},

	/**
	* Dismisses any Instabug views that are currently being shown.
	*/
	dismiss: function () {
		Instabug.dismiss();
	},

	/**
	* Attaches a file to each report being sent.
	* A new copy of the file at fileLocation will be attached with each bug
	* report being sent.
	* Each call to this method overrides the file to be attached.
	* The file has to be available locally at the provided path.
	* @param {string} fileLocation Path to a file that's going to be attached
	* to each report.
	*/
	// Not yet testsed
	setFileAttachment: function(fileLocation) {
		Instabug.setFileAttachment(fileLocation);
	},

	/**
	* Attaches user data to each report being sent.
	* Each call to this method overrides the user data to be attached.
	* Maximum size of the string is 1,000 characters.
	* @param {string} userData A string to be attached to each report, with a
	* maximum size of 1,000 characters.
	*/
	setUserData: function(userData) {
		Instabug.setUserData(userData);
	},

	/**
	* Adds custom logs that will be sent with each report.
	* @param {string} log Message to be logged.
	*/
	IBGLog: function(log) {
		Instabug.IBGLog(log);
	},

	/**
	* Sets whether the SDK is tracking user steps or not.
	* Enabling user steps would give you an insight on the scenario a user has
	* performed before encountering a bug or a crash. User steps are attached
	* with each report being sent.
	* @param {boolean} isUserStepsEnabled A boolean to set user steps tracking
	* to being enabled or disabled.
	*/
	setUserStepsEnabled: function(isUserStepsEnabled) {
		Instabug.setUserStepsEnabled(isUserStepsEnabled);
	},

	/**
	* A callback that gets executed before sending each bug report.
	* @callback preSendingHandler
	*/

	/**
	* Sets a block of code to be executed before sending each report.
	* This block is executed in the background before sending each report. Could
	* be used for attaching logs and extra data to reports.
	* @param {preSendingHandler} preSendingHandler - A callback that gets executed before sending each bug
	* report.
	*/
	setPreSendingHandler: function(preSendingHandler) {
		Instabug.addListener('IBGpreSendingHandler');
		NativeAppEventEmitter.addListener(
			'IBGpreSendingHandler',
			preSendingHandler
		);

		Instabug.setPreSendingHandler(preSendingHandler);
	},

	/**
	* Sets a block of code to be executed just before the SDK's UI is presented.
	* This block is executed on the UI thread. Could be used for performing any 
	* UI changes before the SDK's UI is shown.
	* @callback preSendingHandler 
	*/

	/**
	* Sets a block of code to be executed just before the SDK's UI is presented.
	* This block is executed on the UI thread. Could be used for performing any 
	* UI changes before the SDK's UI is shown.
	* @param {preInvocationHandler} preInvocationHandler - A callback that gets executed before invoking the SDK
	*/
	setPreInvocationHandler: function(preInvocationHandler) {
		Instabug.addListener('IBGpreInvocationHandler');
		NativeAppEventEmitter.addListener(
			'IBGpreInvocationHandler',
			preInvocationHandler
		);

		Instabug.setPreInvocationHandler(preInvocationHandler);
	},

	/**
	* A callback that gets executed after the SDK's UI is dismissed.
	* @callback postInvocationHandler 
	* @param {dismissType} dismissType How the SDK was dismissed.
	* @param {reportType} reportType Type of report that has been sent. Will be set 
	* to IBGReportTypeBug in case the SDK has been dismissed without selecting a 
	* report type, so you might need to check issueState before reportType
	*/

	/**
	* Sets a block of code to be executed right after the SDK's UI is dismissed.
	* This block is executed on the UI thread. Could be used for performing any
	* UI changes after the SDK's UI is dismissed.
	* @param {postInvocationHandler} postInvocationHandler - A callback to get executed after
	* dismissing the SDK.
	*/
	setPostInvocatioHandler: function(postInvocationHandler) {
		Instabug.addListener('IBGpostInvocationHandler');
		NativeAppEventEmitter.addListener(
			'IBGpostInvocationHandler',
			function(payload) {
				postInvocationHandler(payload['dismissType'], payload['reportType']);
			}
		);

		Instabug.setPostInvocatioHandler(postInvocationHandler);
	},

	/**
	* Present a view that educates the user on how to invoke the SDK with the
	* currently set invocation event.
	*/
	showIntroMessage: function() {
		Instabug.showIntroMessage();
	},

	/**
	* Sets the default value of the user's email and hides the email field
	* from the reporting UI.
	* Defaults to an empty string.
	* @param {string} userEmail An email address to be set as the user's email.
	*/
	setUserEmail: function(userEmail) {
		Instabug.setUserEmail(userEmail);
	},

	/**
	* Sets the default value of the user's name to be included with all reports.
	* Defaults to an empty string.
	* @param {string} userName Name of the user to be set.
	*/
	setUserName: function(userName) {
		Instabug.setUserName(userName);
	},

	/**
	* Enables/disables screenshot view when reporting a bug/improvement.
	* By default, screenshot view is shown when reporting a bug, but not when
	* sending feedback.
	* @param {boolean} willSkipeScreenshotAnnotation sets whether screenshot view is
	* shown or not. Passing YES will show screenshot view for both feedback and
	* bug reporting, while passing NO will disable it for both.
	*/
	setWillSkipScreenshotAnnotation: function(willSkipeScreenshotAnnotation) {
		Instabug.setWillSkipScreenshotAnnotation(willSkipeScreenshotAnnotation);
	},

	/**
	* return callback
	* @callback messageCountCallback
	* @param{number} responseCount Notifications count, or -1 incase the SDK has 
	* not been initialized.
	*/

	/**
	* Returns the number of unread messages the user currently has.
	* Use this method to get the number of unread messages the user
	* has, then possibly notify them about it with your own UI.
	* @param {messageCountCallback} messageCountCallback callback with argument 
	* Notifications count, or -1 incase the SDK has not been initialized.
	*/
	getUnreadMessagesCount: function(messageCountCallback) {
		Instabug.getUnreadMessagesCount(messageCountCallback);
	},

	/**
	* Sets the event that invoke the feedback form.
	* Default is set by `Instabug.startWithToken`.
	* @param {invocattionEvent} invocationEvent Event that invokes the
	* feedback form.
	*/
	setInvocationEvent: function(invocationEvent) {
		Instabug.setInvocationEvent(invocationEvent);
	},

	/**
	* Enables/disables the use of push notifications in the SDK.
	* Defaults to YES.
	* @param {boolean} isPushNotificationEnabled A boolean to indicate whether push
	* notifications are enabled or disabled.
	*/
	setPushNotificationsEnabled: function(isPushNotificationEnabled) {
		Instabug.setPushNotificationsEnabled(isPushNotificationEnabled);
	},

	/**
	* Sets whether users are required to enter an email address or not when
	* sending reports.
	* Defaults to YES.
	* @param {boolean} isEmailFieldRequired A boolean to indicate whether email
	* field is required or not.
	*/
	setEmailFieldRequired: function(isEmailFieldRequired) {
		Instabug.setEmailFieldRequired(isEmailFieldRequired);
	},

	/**
	* Sets whether users are required to enter a comment or not when sending reports.
	* Defaults to NO.
	* @param {boolean} isCommentFieldRequired A boolean to indicate whether comment
	* field is required or not.
	*/
	setCommentFieldRequired: function(isCommentFieldRequired) {
		Instabug.setCommentFieldRequired(isCommentFieldRequired);
	},

	/**
	* Sets the threshold value of the shake gesture for iPhone/iPod Touch and iPad.
	* Default for iPhone is 2.5.
 	* Default for iPad is 0.6.
 	* @param {number} iPhoneShakingThreshold Threshold for iPhone.
 	* @param {number} iPadShakingThreshold Threshold for iPad.
	*/
	setShakingThresholdForiPhone: function(iphoneThreshold, ipadThreshold) {
		Instabug.setShakingThresholdForiPhone(iphoneThreshold, ipadThreshold);
	},

	/**
	* Sets the default edge and offset from the top at which the floating button
	* will be shown. Different orientations are already handled.
	* Default for `floatingButtonEdge` is `rectEdge.maxX`.
 	* Default for `floatingButtonOffsetFromTop` is 50
 	* @param {rectEdge} floatingButtonEdge `maxX` to show on the right,
 	* or `minX` to show on the left.
 	* @param {numnber} offsetFromTop floatingButtonOffsetFromTop Top offset for
 	* floating button.
	*/
	setFloatingButtonEdge: function(floatingButtonEdge, offsetFromTop) {
		Instabug.setFloatingButtonEdge(floatingButtonEdge, offsetFromTop);
	},

	/**
	* Sets the SDK's locale.
	* Use to change the SDK's UI to different language.
	* Defaults to the device's current locale.
	* @param {locale} locale A locale to set the SDK to.
	*/
	setLocale: function(locale) {
		Instabug.setLocale(locale);
	},

	/**
	* Sets whether the intro message that gets shown on launching the app is
	* enabled or not.
	* Defaults to YES.
	* @param {boolean} isIntroMessageEnabled A boolean to indicate whether the
	* intro message is enabled or not.
	*/
	setIntroMessageEnabled: function(isIntroMessageEnabled) {
		Instabug.setIntroMessageEnabled(isIntroMessageEnabled);
	},

	/**
	* Sets the color theme of the SDK's whole UI.
	* @param {colorTheme) colorTheme An `colorTheme` to set
	* the SDK's UI to.
	 */
	setColorTheme: function(colorTheme) {
		Instabug.setColorTheme(colorTheme);
	},

	/**
	* Sets the primary color of the SDK's UI.
	* Sets the color of UI elements indicating interactivity or call to action.
	* To use, import processColor and pass to it with argument the color hex
	* as argument.
	* @param {color} color A color to set the UI elements of the SDK to.
	*/
	setPrimaryColor: function(primaryColor) {
		Instabug.setPrimaryColor(primaryColor);
	},

	/**
	* Appends a set of tags to previously added tags of reported feedback,
	* bug or crash.
	* @param {string[]} tags An array of tags to append to current tags.
	*/
	appendTags: function(tags) {
		Instabug.appendTags(tags);
	},

	/**
	* Manually removes all tags of reported feedback, bug or crash.
	*/
	resetTags: function () {
		Instabug.resetTags();
	},

	/**
	* return callback
	* @callback tagsCallback
	* @param {string[]} tags of reported feedback, bug or crash.
	*/

	/**
	* Gets all tags of reported feedback, bug or crash.
	* @param {tagsCallback} tagsCallback callback with argument tags of reported feedback, bug or crash.
	*/
	getTags: function(tagsCallback) {
		Instabug.getTags(tagsCallback);
	},

	/**
	* Overrides any of the strings shown in the SDK with custom ones.
	* Allows you to customize any of the strings shown to users in the SDK.
	* @param {string} string String value to override the default one.
	* @param {strings} key Key of string to override.
	*/
	setStringToKey: function(string, key) {
		Instabug.setString(string, key);
	},

	/**
	* Sets whether attachments in bug reporting and in-app messaging are enabled or not.
	* @param {boolean} screenShot A boolean to enable or disable screenshot attachments.
	* @param {boolean} extraScreenShot A boolean to enable or disable extra
	* screenshot attachments.
 	* @param {boolean} galleryImage A boolean to enable or disable gallery image
 	* attachments. In iOS 10+,NSPhotoLibraryUsageDescription should be set in
 	* info.plist to enable gallery image attachments.
 	* @param {boolean} voiceNote A boolean to enable or disable voice note attachments.
 	* In iOS 10+, NSMicrophoneUsageDescription should be set in info.plist to enable
 	* voiceNote attachments.
 	* @param {boolean} screenRecording A boolean to enable or disable screen recording attachments.
	*/
	setAttachmentTypesEnabled: function(screenshot, extraScreenshot, galleryImage, voiceNote, screenRecording) {
		Instabug.setAttachmentTypesEnabled(screenshot, extraScreenshot, galleryImage, voiceNote, screenRecording);
	},

	/**
	* Enables/disables showing in-app notifications when the user receives a
	* new message.
	* @param {boolean} isChatNotificationEnabled A boolean to set whether
	* notifications are enabled or disabled.
	*/
	setChatNotificationEnabled: function(isChatNotificationEnabled) {
		Instabug.setChatNotificationEnabled(isChatNotificationEnabled);
	},

	/**
	* A callback that gets executed when a new message is received.
	* @callback onNewMessgaeHandler
	*/

	/**
	* Sets a block of code that gets executed when a new message is received.
	* @param {onNewMessgaeHandler} onNewMessgaeHandler - A callback that gets 
	* executed when a new message is received.
	*/
	setOnNewMessageHandler: function(onNewMessgaeHandler) {
		Instabug.addListener('IBGonNewMessageHandler');
		NativeAppEventEmitter.addListener(
			'IBGonNewMessageHandler',
			onNewMessgaeHandler
		);

		Instabug.setOnNewMessageHandler(onNewMessgaeHandler);
	},

	/**
	* Enables/disables prompt options when SDK is invoked.
	* When only a single option is enabled, it become the default invocation mode.
	* If all options are disabled, bug reporting becomes the default invocation mode.
	* By default, all three options are enabled.
	* @param {boolean} bugReportEnabled  A boolean to indicate whether bug reports
	* are enabled or disabled.
	* @param {boolean} feedbackEnabled A boolean to indicate whether feedback is 
	* enabled or disabled.
	* @param {boolean} chatEnabled A boolean to indicate whether chat is enabled 
	* or disabled.
	*/
	setPromptOptions: function(isBugReportingEnabled, isFeedbackReportingEnabled, isChatEnabled) {
		Instabug.setPromptOptions(isBugReportingEnabled, isFeedbackReportingEnabled, isChatEnabled);
	},

	/**
	* return callback
	* @callback isInstabugNotificationCallback
 	* @param {boolean} isInstabugNotification 
	*/

	/**
	* Checks if a notification is from Instabug.
	* If you are using push notifications, use this method to check whether an
	* incoming notification is from Instabug or not. If this method returns YES,
	* you should call didReceiveRemoteNotification: to let the Instabug handle
 	* the notification. Otherwise, handle the notification on your own.
 	* @param {Object} dict Notification's userInfo
 	* @param {isInstabugNotificationCallback} isInstabugNotificationCallback callback with
 	* argument isInstabugNotification
	*/
	isInstabugNotification: function(dict, isInstabugNotificationCallback) {
		Instabug.isInstabugNotification(dict, isInstabugNotificationCallback);
	},

	/**
	 * The event used to invoke the feedback form
	 * @readonly
 	 * @enum {number}
	 */
	invocationEvent: {
		none: Instabug.invocationEventNone,
		shake: Instabug.invocationEventShake,
		screenshot: Instabug.invocationEventScreenshot,
		twoFingersSwipe: Instabug.invocationEventTwoFingersSwipe,
		floatingButton: Instabug.invocationEventFloatingButton
	},
	/**
	 * Type of SDK dismiss
	 * @readonly
 	 * @enum {number}
	 */
	dismissType: {
		submit: Instabug.dismissTypeSubmit,
		cancel: Instabug.dismissTypeCancel,
		addAttachment: Instabug.dismissTypeAddAttachment
	},
	/**
	 * Type of report to be submit
	 * @readonly
 	 * @enum {number}
	 */
	reportType: {
		bug: Instabug.reportTypeBug,
		feedback: Instabug.reportTypeFeedback
	},
	/**
	 *  The mode used upon invocating the SDK
	 * @readonly
 	 * @enum {number}
	 */
	invocationMode: {
		NA: Instabug.invocationModeNA,
		newBug: Instabug.invocationModeNewBug,
		newFeedback: Instabug.invocationModeNewFeedback,
		newChat: Instabug.invocationModeNewChat,
		chatsList: Instabug.invocationModeChatsList
	},
	/**
	 * The supported locales
	 * @readonly
 	 * @enum {number}
	 */
	locale: {
		arabic: Instabug.localeArabic,
		chineseSimplified: Instabug.localeChineseSimplified,
		chineseTraditional: Instabug.localeChineseTraditional,
		czech: Instabug.localeCzech,
		danish: Instabug.localeDanish,
		english: Instabug.localeEnglish,
		french: Instabug.localeFrench,
		german: Instabug.localeGerman,
		italian: Instabug.localeItalian,
		japanese: Instabug.localeJapanese,
		polish: Instabug.localePolish,
		portugueseBrazil: Instabug.localePortugueseBrazil,
		russian: Instabug.localeRussian,
		spanish: Instabug.localeSpanish,
		swedish: Instabug.localeSwedish,
		turkish: Instabug.localeTurkish
	},
	/**
	 * The color theme of the different UI elements
	 * @readonly
 	 * @enum {number}
	 */
	colorTheme: {
		light: Instabug.colorThemeLight,
		dark: Instabug.colorThemeDark
	},
	/** 
	* Rectangle edges
	* @readonly
 	* @enum {number}
	*/
	rectEdge: {
		minX: Instabug.rectMinXEdge,
		minY: Instabug.rectMinYEdge,
		maxX: Instabug.rectMaxXEdge,
		maxY: Instabug.rectMaxYEdge
	},
	/**
	 * Instabug strings
	 * @readonly
 	 * @enum {number}
	 */
	strings: {
		shakeHint: Instabug.shakeHint,
		swipeHint: Instabug.swipeHint,
		edgeSwipeStartHint: Instabug.edgeSwipeStartHint,
		startAlertText: Instabug.startAlertText,
		invalidEmailMessage: Instabug.invalidEmailMessage,
		invalidEmailTitle: Instabug.invalidEmailTitle,
		invalidCommentMessage: Instabug.invalidCommentMessage,
		invalidCommentTitle: Instabug.invalidCommentTitle,
		invocationHeader: Instabug.invocationHeader,
		talkToUs: Instabug.talkToUs,
		reportBug: Instabug.reportBug,
		reportFeedback: Instabug.reportFeedback,
		emailFieldHint: Instabug.emailFieldHint,
		commentFieldHintForBugReport: Instabug.commentFieldHintForBugReport,
		commentFieldHintForFeedback: Instabug.commentFieldHintForFeedback,
		addVideoMessage: Instabug.addVideoMessage,
		addVoiceMessage: Instabug.addVoiceMessage,
		addImageFromGallery: Instabug.addImageFromGallery,
		addExtraScreenshot: Instabug.addExtraScreenshot,
		audioRecordingPermissionDeniedTitle: Instabug.audioRecordingPermissionDeniedTitle,
		audioRecordingPermissionDeniedMessage: Instabug.audioRecordingPermissionDeniedMessage,
		microphonePermissionAlertSettingsButtonText: Instabug.microphonePermissionAlertSettingsButtonText,
		recordingMessageToHoldText: Instabug.recordingMessageToHoldText,
		recordingMessageToReleaseText: Instabug.recordingMessageToReleaseText,
		conversationsHeaderTitle: Instabug.conversationsHeaderTitle,
		screenshotHeaderTitle: Instabug.screenshotHeaderTitle,
		chatsNoConversationsHeadlineText: Instabug.chatsNoConversationsHeadlineText,
		doneButtonText: Instabug.doneButtonText,
		okButtonText: Instabug.okButtonText,
		cancelButtonText: Instabug.cancelButtonText,
		thankYouText: Instabug.thankYouText,
		audio: Instabug.audio,
		video: Instabug.video,
		image: Instabug.image,
		chatsHeaderTitle: Instabug.chatsHeaderTitle,
		team: Instabug.team,
		messageNotification: Instabug.messageNotification,
		messagesNotifiactionAndOthers: Instabug.messagesNotifiactionAndOthers
	}
}