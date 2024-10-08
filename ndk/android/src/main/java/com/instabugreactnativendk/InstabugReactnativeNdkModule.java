package com.instabugreactnativendk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = InstabugReactnativeNdkModule.NAME)
public class InstabugReactnativeNdkModule extends ReactContextBaseJavaModule {
  public static final String NAME = "InstabugReactnativeNdk";

  public InstabugReactnativeNdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
