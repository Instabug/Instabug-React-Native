
# instabug-reactnative

## Installation

`$ npm install https://github.com/Instabug/instabug-reactnative --save`

`$ rnpm link instabug-reactnative`

#### iOS

1. Open your app `.xcodeproj` file
2. Add `instabug.framework` and `instabug.bundle` from 'instabug-reactnative/ios' to the app project directory. 
3. In XCode, in the project navigator, select your project. Add `instabug.framework` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. In XCode, in the project navigator, select your project. Add `CoreTelephony.framework` to your project's `Build Phases` ➜ `Link Binary With Libraries`
5. In XCode, in the project navigator, select your project. Add `CoreMotion.framework` to your project's `Build Phases` ➜ `Link Binary With Libraries`
6. In XCode, in the project navigator, select your project. Add `instabug.bundle` to your project's `Build Phases` ➜ `Copy Bundle Resources`
7. Run your project (`Cmd+R`)<

#### Android (Pending)

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
    Instabug.startWithToken('0f0dc916bd9175e3b5d2fdf0cfa49a69', Instabug.constants.invocationEvent.floatingButton);
  }
  ...
}
```
  
## License

This software is released under <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.

© 2016 Instabug. All rights reserved.