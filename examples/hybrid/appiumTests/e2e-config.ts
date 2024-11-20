require('dotenv').config();

export let capabilities: any;

const android = {
  platformName: 'Android',
  'appium:platformVersion': '14', //Update Your Platform Version
  'appium:deviceName': 'Pixel 8 API 34', //Update Your emulator Name
  'appium:app': './android/app/build/outputs/apk/debug/app-debug.apk', //apk path
  'appium:appPackage': 'com.instabug.hybridsampleapp',
  'appium:appActivity': '.MainActivity',
  'appium:automationName': 'UiAutomator2',
};

const ios = {
  'appium:platformName': 'iOS',
  'appium:automationName': 'XCUITest', // driver
  'appium:deviceName': 'iPhone 11 Pro Max', // TODO: update your device name
  'appium:platformVersion': '15.5', // TODO: update platform version
  'appium:bundleId': 'com.instabug.HybridSampleApp', // TODO: update your app bundle id
};
if (process.env.E2E_DEVICE === 'android') {
  capabilities = android;
}
if (process.env.E2E_DEVICE === 'ios') {
  capabilities = ios;
}

export default capabilities;