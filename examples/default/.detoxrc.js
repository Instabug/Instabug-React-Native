/** @type {Detox.DetoxConfig} */

const { execSync } = require('child_process');

// Function to get the iOS simulator device type
function getSimulatorDeviceType() {
  try {

     /// Execute 'xcrun simctl list devices' command to get the list of iOS simulator devices
     const allSimulatorDevices = execSync('xcrun simctl list devices').toString();

     /// Filter the output to get the list of iPhone devices
     const filteredDevices = allSimulatorDevices.match(/iPhone[^)]*/g);

     /// Clean the device names to get the final device type
     const cleanedDevices = filteredDevices.map(device => device.replace(/\(.*$/, '').trim());

     /// Assuming you want to use the last device from the list, you can modify this logic as needed
     const lastDeviceType = cleanedDevices[cleanedDevices.length - 1];

     /// Remove the trailing newline character from the device type
     const trimmedDeviceType = lastDeviceType.replace('\n', '');

     /// Return the final device type
     return trimmedDeviceType;
  } catch (error) {
    console.error('Error while fetching iOS simulator device list:', error);
    return null;
  }
}


module.exports = {
  testRunner: {
    $0: 'jest',
    args: {
      config: 'e2e/config.json',
      _: ['e2e'],
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/InstabugExample.app',
      build:
        'xcodebuild -workspace ios/InstabugExample.xcworkspace -scheme InstabugExample -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/InstabugExample.app',
      build:
        'xcodebuild -workspace ios/InstabugExample.xcworkspace -scheme InstabugExample -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: getSimulatorDeviceType(),
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: getAVDName(),
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release',
    },
  },
};
