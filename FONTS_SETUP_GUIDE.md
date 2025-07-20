# Complete Font Setup Guide for Instabug React Native

This guide covers all ways to use fonts with the `setTheme` function in Instabug React Native, including Google Fonts, custom fonts, system fonts, and both Expo and regular React Native projects.

## Table of Contents

1. [Overview](#overview)
2. [Font Types Supported](#font-types-supported)
3. [Regular React Native Setup](#regular-react-native-setup)
4. [Expo Setup](#expo-setup)
5. [Asset Linking Options](#asset-linking-options)
6. [Usage Examples](#usage-examples)
7. [Troubleshooting](#troubleshooting)
8. [Platform Compatibility Notes](#platform-compatibility-notes)

## Overview

The Instabug React Native bridge supports font loading from multiple sources:
- **App Bundle**: Fonts included in your app assets
- **System Fonts**: Built-in platform fonts
- **Custom Fonts**: Any TTF/OTF font files
- **Google Fonts**: Downloaded TTF files from Google Fonts

## Font Types Supported

### 1. Google Fonts
- Download TTF files from [Google Fonts](https://fonts.google.com/)
- Examples: Roboto, Inter, Nunito, Open Sans, Lato

### 2. Custom Fonts
- Any TTF/OTF font files
- Commercial fonts, free fonts, custom designs

### 3. System Fonts
- Platform default fonts
- No setup required
- Examples: San Francisco (iOS), Roboto (Android)

## Regular React Native Setup

### Method 1: Bundle Fonts (Recommended)

#### Step 1: Download Font Files
```bash
# Create fonts directory
mkdir fonts

# Download your desired fonts (example with Google Fonts)
# Download from Google Fonts or any font provider
# Place TTF files in the fonts directory
```

#### Step 2: Add to Android
```bash
# Create assets/fonts directory
mkdir -p android/app/src/main/assets/fonts

# Copy font files
cp fonts/*.ttf android/app/src/main/assets/fonts/
```

#### Step 3: Add to iOS
1. **Add to Xcode Project:**
   - Open your iOS project in Xcode
   - Right-click on your project → "Add Files to [ProjectName]"
   - Select your TTF files
   - Make sure "Add to target" is checked

2. **Update Info.plist:**
```xml
<key>UIAppFonts</key>
<array>
    <string>Roboto-Regular.ttf</string>
    <string>Roboto-Bold.ttf</string>
    <string>Inter-Regular.ttf</string>
    <string>Inter-Bold.ttf</string>
</array>
```

#### Step 4: Use with setTheme
```typescript
import Instabug from 'instabug-reactnative';
import { Platform } from 'react-native';

const applyCustomTheme = () => {
  Instabug.setTheme({
    // Colors
    primaryColor: '#2196F3',
    backgroundColor: '#FFFFFF',
    primaryTextColor: '#333333',
    
    // Text styles (Android only)
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
    
    // Fonts - Android (use font paths)
    ...(Platform.OS === 'android' && {
      primaryFontPath: '/data/user/0/com.yourapp/files/fonts/Roboto-Regular.ttf',
      secondaryFontPath: '/data/user/0/com.yourapp/files/fonts/Roboto-Light.ttf',
      ctaFontPath: '/data/user/0/com.yourapp/files/fonts/Roboto-Bold.ttf',
    }),
    
    // Fonts - iOS (use font paths, not assets)
    ...(Platform.OS === 'ios' && {
      primaryFontPath: 'fonts/Roboto-Regular.ttf',
      secondaryFontPath: 'fonts/Roboto-Light.ttf',
      ctaFontPath: 'fonts/Roboto-Bold.ttf',
    }),
  });
};
```

### Method 2: System Fonts Only
```typescript
import Instabug from 'instabug-reactnative';

const applySystemTheme = () => {
  Instabug.setTheme({
    // Colors only - uses system fonts
    primaryColor: '#2196F3',
    backgroundColor: '#FFFFFF',
    primaryTextColor: '#333333',
    secondaryTextColor: '#666666',
    titleTextColor: '#000000',
    
    // Text styles (Android only)
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
    
    // No font paths = uses system fonts
  });
};
```

## Expo Setup

### Method 1: Expo Fonts (Recommended for Expo)

#### Step 1: Install Expo Fonts
```bash
npx expo install expo-font
```

#### Step 2: Download and Add Fonts
```bash
# Create fonts directory
mkdir fonts

# Download your fonts and place them in the fonts directory
# Example: Roboto-Regular.ttf, Roboto-Bold.ttf, Inter-Regular.ttf
```

#### Step 3: Configure app.json
```json
{
  "expo": {
    "fonts": [
      {
        "asset": "./fonts/Roboto-Regular.ttf",
        "family": "Roboto-Regular"
      },
      {
        "asset": "./fonts/Roboto-Bold.ttf",
        "family": "Roboto-Bold"
      },
      {
        "asset": "./fonts/Inter-Regular.ttf",
        "family": "Inter-Regular"
      }
    ]
  }
}
```

#### Step 4: Load Fonts in Your App
```typescript
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Regular': require('./fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./fonts/Roboto-Bold.ttf'),
        'Inter-Regular': require('./fonts/Inter-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return <YourApp />;
}
```

#### Step 5: Use with setTheme
```typescript
import Instabug from 'instabug-reactnative';
import { Platform } from 'react-native';

const applyExpoTheme = () => {
  Instabug.setTheme({
    // Colors
    primaryColor: '#2196F3',
    backgroundColor: '#FFFFFF',
    primaryTextColor: '#333333',
    
    // Text styles (Android only)
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
    
    // Fonts - use font paths for both platforms
    primaryFontPath: 'fonts/Roboto-Regular.ttf',
    secondaryFontPath: 'fonts/Inter-Regular.ttf',
    ctaFontPath: 'fonts/Roboto-Bold.ttf',
  });
};
```

### Method 2: Expo with Bundle Fonts
Same as Regular React Native Method 1, but fonts are automatically included in the Expo build.

## Asset Linking Options

### Option 1: Manual Copy (Current Method)
- Copy TTF files to native directories
- Update Info.plist manually
- Works with all setups

### Option 2: React Native CLI Linking
```bash
# Create a react-native.config.js file
module.exports = {
  assets: ['./fonts/'],
};
```

Then run:
```bash
npx react-native link
```

### Option 3: Expo Asset Linking
```json
{
  "expo": {
    "fonts": [
      {
        "asset": "./fonts/Roboto-Regular.ttf",
        "family": "Roboto-Regular"
      }
    ]
  }
}
```

### Option 4: Metro Asset Plugin
```bash
npm install --save-dev react-native-asset
```

Create `react-native.config.js`:
```javascript
module.exports = {
  assets: ['./fonts/'],
};
```

## Usage Examples

### Example 1: Google Fonts (Roboto)
```typescript
// Download: Roboto-Regular.ttf, Roboto-Bold.ttf, Roboto-Light.ttf
// Add to project using any method above

const applyRobotoTheme = () => {
  Instabug.setTheme({
    primaryColor: '#1976D2',
    backgroundColor: '#FAFAFA',
    primaryTextColor: '#212121',
    secondaryTextColor: '#757575',
    titleTextColor: '#000000',
    
    // Text styles (Android only)
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
    
    // Font paths for both platforms
    primaryFontPath: 'fonts/Roboto-Regular.ttf',
    secondaryFontPath: 'fonts/Roboto-Light.ttf',
    ctaFontPath: 'fonts/Roboto-Bold.ttf',
  });
};
```

### Example 2: Custom Fonts (Inter)
```typescript
// Download: Inter-Regular.ttf, Inter-Bold.ttf, Inter-Medium.ttf
// Add to project using any method above

const applyInterTheme = () => {
  Instabug.setTheme({
    primaryColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    primaryTextColor: '#1F2937',
    secondaryTextColor: '#6B7280',
    titleTextColor: '#111827',
    
    // Text styles (Android only)
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
    
    // Font paths for both platforms
    primaryFontPath: 'fonts/Inter-Regular.ttf',
    secondaryFontPath: 'fonts/Inter-Medium.ttf',
    ctaFontPath: 'fonts/Inter-Bold.ttf',
  });
};
```

### Example 3: System Fonts Only
```typescript
const applySystemTheme = () => {
  Instabug.setTheme({
    primaryColor: '#007AFF',
    backgroundColor: '#F2F2F7',
    primaryTextColor: '#000000',
    secondaryTextColor: '#8E8E93',
    titleTextColor: '#000000',
    
    // Text styles (Android only) - no font paths = uses system fonts
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
  });
};
```

### Example 4: Mixed Approach
```typescript
const applyMixedTheme = () => {
  Instabug.setTheme({
    primaryColor: '#FF6B6B',
    backgroundColor: '#FFFFFF',
    primaryTextColor: '#2D3436',
    secondaryTextColor: '#636E72',
    titleTextColor: '#2D3436',
    
    // Text styles (Android only)
    primaryTextStyle: 'normal',
    secondaryTextStyle: 'normal',
    ctaTextStyle: 'bold',
    
    // Custom font only for CTA - rest use system fonts
    ctaFontPath: 'fonts/Roboto-Bold.ttf',
  });
};
```

## Platform Compatibility Notes

### **Important: iOS Font Asset Limitation**

The iOS implementation currently **only supports** `primaryFontPath`, `secondaryFontPath`, and `ctaFontPath` properties. The `*FontAsset` properties are **not supported** on iOS.

**Android**: Supports both `*FontPath` and `*FontAsset` properties
**iOS**: Only supports `*FontPath` properties

### **Recommended Approach**

Use `*FontPath` properties for both platforms to ensure compatibility:

```typescript
// ✅ Works on both platforms
Instabug.setTheme({
  primaryFontPath: 'fonts/Roboto-Regular.ttf',
  secondaryFontPath: 'fonts/Roboto-Light.ttf',
  ctaFontPath: 'fonts/Roboto-Bold.ttf',
});

// ❌ iOS doesn't support these
Instabug.setTheme({
  primaryFontAsset: 'fonts/Roboto-Regular.ttf', // iOS ignores this
  secondaryFontAsset: 'fonts/Roboto-Light.ttf', // iOS ignores this
  ctaFontAsset: 'fonts/Roboto-Bold.ttf', // iOS ignores this
});
```

### **Font Path Format**

- **Android**: Can use full paths or just filenames
- **iOS**: Use relative paths like `fonts/Roboto-Regular.ttf`

## Troubleshooting

### Common Issues

#### 1. Font Not Loading
**Symptoms:** Font appears as system font or doesn't change
**Solutions:**
- Check font filename matches exactly (case-sensitive)
- Verify font is added to both Android and iOS
- For iOS, check Info.plist entries
- For Expo, ensure fonts are loaded before using setTheme
- **iOS users**: Make sure you're using `*FontPath` properties, not `*FontAsset`

#### 2. Font Loading in Expo
**Symptoms:** Font works in development but not in production
**Solutions:**
- Use `expo-font` to load fonts before app starts
- Ensure fonts are included in app.json
- Test with `expo build` or EAS Build

#### 3. Font File Issues
**Symptoms:** App crashes or font doesn't load
**Solutions:**
- Verify TTF file is not corrupted
- Check file size (should be reasonable, not 0 bytes)
- Ensure font file is valid TTF/OTF format

#### 4. Performance Issues
**Symptoms:** App slow to start or font loading delays
**Solutions:**
- Use system fonts for better performance
- Limit number of custom fonts
- Preload fonts in app initialization

### Debug Steps

1. **Check Font Loading:**
```typescript
// Add this to debug font loading
console.log('Available fonts:', Instabug.getAvailableFonts()); // If available
```

2. **Verify File Paths:**
```bash
# Check if fonts are in the right place
ls -la android/app/src/main/assets/fonts/
ls -la ios/YourApp/
```

3. **Test with System Fonts First:**
```typescript
// Test with system fonts to ensure setTheme works
Instabug.setTheme({
  primaryColor: '#FF0000',
  // No fontFamily = system fonts
});
```

## Best Practices

1. **Use System Fonts When Possible:** Better performance and consistency
2. **Limit Custom Fonts:** Use 1-2 custom fonts maximum
3. **Preload Fonts:** Load fonts before app starts
4. **Test on Both Platforms:** Fonts may behave differently on iOS vs Android
5. **Use Standard Font Weights:** Regular, Bold, Light are most reliable
6. **Keep Font Files Small:** Optimize TTF files for mobile
7. **Use *FontPath Properties:** Ensures compatibility with both platforms

## Summary

- **Regular React Native:** Use bundle fonts or system fonts
- **Expo:** Use expo-font or bundle fonts
- **Asset Linking:** Available through CLI tools and Expo config
- **Google Fonts:** Download TTF files and add to project
- **Custom Fonts:** Any TTF/OTF file works the same way
- **System Fonts:** No setup required, best performance
- **Platform Compatibility:** Use `*FontPath` properties for both platforms

The native bridge handles all font loading automatically once fonts are properly added to your project! 