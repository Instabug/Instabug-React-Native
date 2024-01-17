#!/bin/bash

# remove survey and featureRequest features in JavaScript files
deletedFeaturesFilesInJavaScript=("Surveys" "FeatureRequests" "Survey")
for feature in "${deletedFeaturesFilesInJavaScript[@]}";
 do
   echo "$feature"
rm -f  src/modules/"$feature".ts
rm -f test/mocks/mock"$feature".ts
sed -i "s/import..*$feature';//g"  src/index.ts
sed -i "s/$feature,//g"  src/index.ts

done
npx eslint  src/index.ts --fix

# remove survey and featureRequest features in Android  files
deletedFeaturesFilesInAndroidApp=("RNInstabugSurveysModule" "RNInstabugFeatureRequestsModule")
for feature in "${deletedFeaturesFilesInAndroidApp[@]}";
 do
      echo "$feature"

rm -f android/src/main/java/com/instabug/reactlibrary/"$feature".java
rm -f android/src/test/java/com/instabug/reactlibrary/"$feature"Test.java
sed -i "s/modules.add(new $feature(reactContext));//g"  android/src/main/java/com/instabug/reactlibrary/RNInstabugReactnativePackage.java

done

# remove survey and featureRequest features in IOS  files
deletedFeaturesFilesInIosApp=("InstabugSurveysBridge" "InstabugFeatureRequestsBridge")
for feature in "${deletedFeaturesFilesInIosApp[@]}";
 do
      echo "$feature"
rm -f ios/RNInstabug/"$feature".h
rm -f ios/RNInstabug/"$feature".m
done
sed -i "s/\#import <Instabug\/IBGSurveys.h>//g"  ios/RNInstabug/InstabugReactBridge.m
sed -i "s/\#import <Instabug\/IBGSurveys.h>//g"  ios/RNInstabug/InstabugReactBridge.h


# remove all locales except English locale
sed -i -E '/english/!s/.*constants.locale.*//g' src/utils/Enums.ts
npx eslint  src/index.ts --fix src/utils/Enums.ts

#disable supportsNamespace
sed -i "s/return (major == 7 && minor >= 3) || major >= 8/return false/g"  ./android/build.gradle
sed -i "s/static boolean supportsNamespace() {/static boolean supportsNamespace() { \n return false;/g"  ./android/build.gradle


