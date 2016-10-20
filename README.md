
# instabug-reactnative

## Dependencies

`react-native` version `>0.26`

## Installation

#### iOS

`$ npm install https://github.com/Instabug/instabug-reactnative --save`

`$ rnpm link instabug-reactnative`

1. Open your app `.xcodeproj` file
2. Add the following line to your "Podfile": `pod 'Instabug', '~> 6.0.0'`
3. run `pod install`
4. Run your project (`Cmd+R`)<

#### Android (Pending)

`$ npm install https://github.com/Instabug/instabug-reactnative --save`

`$ rnpm link instabug-reactnative`

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.instabug.reactlibrary.RNInstabugReactnativePackage;` to the imports at the top of the file
  - Add `new RNInstabugReactnativePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':instabug-reactnative'
  	project(':instabug-reactnative').projectDir = new File(rootProject.projectDir, 	'../node_modules/instabug-reactnative/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':instabug-reactnative')
  	```

## Usage
```javascript
import Instabug from'instabug-reactnative';

class testApp extends Component {
  constructor() {
    super();
    Instabug.startWithToken('YOUR_TOKEN', Instabug.invocationEvent.floatingButton);
  }
  ...
}
```

### iOS

If your app doesn't already access the microphone or photo library, you'll need to add the following 2 keys to your app's info.plist file:

    NSMicrophoneUsageDescription
    NSPhotoLibraryUsageDescription
  
## License

This software is released under <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.

© 2016 Instabug. All rights reserved.