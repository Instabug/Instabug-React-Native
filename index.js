
import {NativeModules} from 'react-native';

let {Instabug} = NativeModules;

module.exports = {
	reportFeedback: function () {
		Instabug.report('feedback');
	},

	reportBug: function () {
		Instabug.report('bug');
	},

	/**
	 * Adds tag(s) to issues before sending them
	 * @param tags  NOTICE: multiple tags with comma(,) split
	 */
	addTags: function (tags) {
		Instabug.addTags(tags);
	},

	/**
	 [CHINA/CHINESE/PRC/SIMPLIFIED_CHINESE -> CHINESE]
	 [TAIWAN/TRADITIONAL_CHINESE -> TAIWAN]
	 [ENGLISH -> ENGLISH]
	 [UK -> UK]
	 [US -> US]
	 * @param languageTag
	 */
	changeLocale: function (languageTag) {
		Instabug.changeLocale(tags);
	},

	/**
	 * The file at filePath will be uploaded along upcoming reports with the name fileNameWithExtension
	 * @param fileUri
	 * @param fileNameWithExtension
	 */
	setFileAttachment: function (fileUri, fileNameWithExtension) {
		Instabug.setFileAttachment(fileUri, fileNameWithExtension);
	},

	/**
	 * If your app already acquires the user's email address and you provide it to this method,
	 * Instabug will pre-fill the user email in reports.
	 * @param userEmail
	 */
	setUserEmail: function (userEmail) {
		Instabug.setUserEmail(userEmail);
	},

	/**
	 * Sets the user name that is used in the dashboard's contacts.
	 * @param username
	 */
	setUsername: function (username) {
		Instabug.setUsername(username);
	},

	/**
	 * Adds specific user data that you need to be added to the reports
	 * @param userData
	 */
	setUserData: function (userData) {
		Instabug.setUserData(userData);
	},

	/**
	 * Call this method to display the discovery dialog explaining the shake gesture or the two finger swipe gesture,
	 * if you've enabled it   i.e: This method is automatically called on first run of the application
	 */
	showIntroMessage: function () {
		Instabug.showIntroMessage();
	},
};