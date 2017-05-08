
# instabug-reactnative

## Dependencies

`react-native` version `>0.26`

## Installation

`$ npm install https://github.com/Instabug/instabug-reactnative#master --save`

`$ react-native link instabug-reactnative`

#### iOS installation

1. Open your app `.xcodeproj` file
2. Add the following line to your "Podfile": `pod 'Instabug', '~> 7.0'`
3. run `pod install`
4. Run your project (`Cmd+R`)<

#### Android Manual installation

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add 

    ```java
    import com.instabug.reactlibrary.RNInstabugReactnativePackage;
    ```

   to the imports at the top of the file
  - Add 

    ```java
    new RNInstabugReactnativePackage("YOUR_ANDROID_APPLICATION_TOKEN",MainApplication.this,"INVOCATION_EVENT");
    ``` 

  to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:

  	```gradle
  	include ':instabug-reactnative'
  	project(':instabug-reactnative').projectDir = new File(rootProject.projectDir, 	'../node_modules/instabug-reactnative/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

  	```gradle
      compile project(':instabug-reactnative')
  	```

## Usage 

  ```javascript

  import Instabug from'instabug-reactnative';

  ```


### iOS Example 

```javascript
class testApp extends Component {
  constructor() {
    super();
    Instabug.startWithToken('YOUR_TOKEN', Instabug.invocationEvent.floatingButton);
  }
  ...
}
```

You can check the rest of the APIs here [Wiki](https://github.com/Instabug/instabug-reactnative/wiki).


If your app doesn't already access the microphone or photo library, you'll need to add the following 2 keys to your app's info.plist file:

    NSMicrophoneUsageDescription
    NSPhotoLibraryUsageDescription

### Android Example


Usage

To initialize Instabug in your app, you only need to link instabug-reactnative correctly by overwriting 

"YOUR_ANDROID_TOKEN" text by your android app token,
"button" text by your desired invocation event, 
"light" text by your desired color theme,
and can take a wide range of optional parameters for configuration.

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

after linking the plugin, you should find the getPackages method looks like 

  ```java
      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
              new RNInstabugReactnativePackage("YOUR_ANDROID_TOKEN",MainApplication.this,"button","light")
        );
      }
  ```
The invocation event can be specified as one of the following values:


| value | native equivalent | description  |
|:------------:|:-------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| 'shake' | InstabugInvocationEvent.SHAKE | Shaking the device while in any screen to show the feedback form. |
| 'button' | InstabugInvocationEvent.FLOATING_BUTTON | Shows a floating button on top of all views, when pressed it takes a screenshot. |
| 'screenshot' | InstabugInvocationEvent.SCREENSHOT_GESTURE | Taking a screenshot using the Home+Lock buttons while in any screen to show the feedback form, substituted with IBGInvocationEventShake on iOS 6.1.3 and earlier. |
| 'swipe' | InstabugInvocationEvent.TWO_FINGER_SWIPE_LEFT | Swiping two fingers left while in any screen to show the feedback form. |
| 'none' | InstabugInvocationEvent.NONE | No event will be registered to show the feedback form, you'll need to code your own and call the method invoke. |

The InstabugColorTheme can be specified as one of the following values:


| value | native equivalent | description  |
|:------------:|:-------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| 'light'| InstabugColorTheme.InstabugColorThemeLight |light theme is color theme to use for the SDK's UI|
| 'dark'| InstabugColorTheme.InstabugColorThemeDark |Dark theme is color theme to use for the SDK's UI|

## License

This software is released under <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.

© 2016 Instabug. All rights reserved.
