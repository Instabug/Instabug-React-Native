package com.instabugsample;

import android.app.Application;
import android.content.Context;

import androidx.multidex.MultiDex;
import androidx.multidex.MultiDexApplication;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.instabug.library.Instabug;
import com.instabug.library.ui.onboarding.WelcomeMessage;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;


import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    new RNInstabugReactnativePackage.Builder("YOUR_TOKEN", MainApplication.this)
            .setInvocationEvent("button")
            .setPrimaryColor("#1D82DC")
            .setFloatingEdge("left")
            .setFloatingButtonOffsetFromTop(250)
            .build();
    Instabug.setWelcomeMessageState(WelcomeMessage.State.DISABLED);
    SoLoader.init(this, /* native exopackage */ false);
  }
//
//  @Override
//  protected void attachBaseContext(Context base) {
//    super.attachBaseContext(base);
//    MultiDex.install(this);
//  }
}
