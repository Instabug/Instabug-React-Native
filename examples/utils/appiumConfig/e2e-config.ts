export let capabilities: any;

const android = {
  platformName: 'Android',
  'appium:platformVersion': '14', //Update Your Platform Version
  'appium:deviceName': 'pixel_3a',
  'appium:avd': 'Pixel_8',
  'appium:app': process.env.APK_PATH || './android/app/build/outputs/apk/release/app-release.apk', //apk path
  'appium:appPackage': 'com.instabug.hybridsampleapp',
  'appium:appActivity': '.MainActivity',
  'appium:automationName': 'UiAutomator2',
  'appium:proxy': {
    proxyType: 'manual',
    httpProxy: 'localhost:8084',
    sslProxy: 'localhost:8084',
  },
};

const ios = {
  'appium:platformName': 'iOS',
  'appium:automationName': 'XCUITest', // driver
  'appium:deviceName': 'iPhone 13', // TODO: update your device name
  'appium:platformVersion': '17.5', // TODO: update platform version
  'appium:bundleId': 'com.instabug.HybridSampleApp', // TODO: update your app bundle id
  'appium:proxy': {
    proxyType: 'manual',
    httpProxy: 'localhost:8080',
    sslProxy: 'localhost:8080',
  },
};
if (process.env.E2E_DEVICE === 'android') {
  capabilities = android;
}
if (process.env.E2E_DEVICE === 'ios') {
  capabilities = ios;
}

export default capabilities;