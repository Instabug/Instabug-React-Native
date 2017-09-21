
# instabug-reactnative

Upgrading? Check the [Upgrade Guide](#upgrading-guide) before bumping to a new major version.

## Installation
This section explains how to install Instabug SDK into your React Native application.

1. Open the terminal and navigate to your React Native Directory. Then run the following command.

```bash
npm install instabug-reactnative
```
or

```bash
yarn add instabug-reactnative
```

2. Install [**Ruby**](https://www.ruby-lang.org/en/documentation/installation/). (You can skip this step if you're building for Android only)

3. Link the bridging files in the npm package to the ios project use the following command.
```bash
react-native link instabug-reactnative
```

## Using Instabug
1. To start using Instabug, import it into your `index.ios.js` and `index.android.js` file.

```javascript
import Instabug from 'instabug-reactnative';
```
2. Then initialize it in the `constructor` or `componentWillMount`. This line will let the Instabug SDK work with the default behavior. The SDK will be invoked when the device is shaken. You can customize this behavior through the APIs (You can skip this step if you are building an Android app only).

```javascript
Instabug.startWithToken('IOS_APP_TOKEN', Instabug.invocationEvent.shake);
```
3. Open `android/app/src/main/java/[...]/MainApplication.java`
   You should find the getPackages method looks like the following snippet. You just need to add your Android app token (You can skip this step if you are building an iOS app only). You can change the invocation event from here, simply by replacing the `"shake"` with any of the following `"button"`, `"none"`, `"screenshot"`, or `"swipe"`. You can change the primary color by replacing the `"#1D82DC"` with any colour of your choice.
   In the case that you are using the floating button as an invocation event, you can change the floating button edge and the floating button offset using the last two methods, by replacing `"left"` to `"right"`, and by changing the offset number. 
```javascript
@Override
protected List<ReactPackage> getPackages() {
	return Arrays.<ReactPackage>asList(
	new MainReactPackage(),
	new RNInstabugReactnativePackage.Builder("YOUR_APP_TOKEN", MainApplication.this)
                            .setInvocationEvent("shake")
                            .setPrimaryColor("#1D82DC")
                            .setFloatingEdge("left")
                            .setFloatingButtonOffsetFromTop(250)
                            .build()
}
```
You can find your app token by selecting the SDK tab from your [**Instabug dashboard**](https://dashboard.instabug.com/app/sdk/).

## Upgrading guide

Version 2.0.0

- **removes dependency on Cocoapods** when installing Instabug
- **ensures consistency** between the React Native SDK, and the Native SDK

### Upgrading from 1.x.x

When upgrading from version 1.x.x please make sure you do the following steps: 

1. Run 
```bash
npm install instabug-reactnative
```
2. Open your Pod file and delete this line ```pod 'Instabug', '~> 7.0'```

3. Run this command from inside the ```ios``` directory inside your root project's directory
```bash
pod install
```

4. Run this command from your root project's directory. Make sure you have [**Ruby**](https://www.ruby-lang.org/en/documentation/installation/) installed before running this last command. (You can skip installing Ruby if you're building an Android app only)

 ```bash
react-native link instabug-reactnative
``` 

## Documentation
For more details about the supported APIs and how to use them, you can check our [**Documentation**](https://docs.instabug.com/docs/react-native-overview).


## Contact US 
If you have any questions or feedback don't hesitate to get in touch. You can reach us at any time through **support@instabug.com**.



## License

This software is released under <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.

© 2016 Instabug. All rights reserved.
