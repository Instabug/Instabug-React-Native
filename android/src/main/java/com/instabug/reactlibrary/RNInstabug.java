package com.instabug.reactlibrary;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.VisibleForTesting;

import com.facebook.react.bridge.ReadableMap;
import com.instabug.apm.APM;
import com.instabug.library.Instabug;
import com.instabug.library.LogLevel;
import com.instabug.library.Platform;
import com.instabug.library.invocation.InstabugInvocationEvent;
import com.instabug.reactlibrary.utils.InstabugUtil;

import java.lang.reflect.Method;

public class RNInstabug {

    private static RNInstabug instance;

    private RNInstabug() {
    }


    public static RNInstabug getInstance() {
        if (instance == null) {
            synchronized (RNInstabug.class) {
                if (instance == null) {
                    instance = new RNInstabug();
                }
            }
        }
        return instance;
    }

    /**
     * Initializes the SDK on the native side, which is useful for capturing startup issues specific to the native part of the app.
     *
     * @param application      The application context.
     * @param applicationToken The app's identifying token, available on your dashboard.
     * @param logLevel         The level of detail in logs that you want to print.
     *                         <p>Pick one of the log levels described in {@link LogLevel}.
     *                         default logLevel is {@link LogLevel#ERROR}</p>
     * @param InvocationEvent  The events that trigger the SDK's user interface.
     *                         Choose from the available events listed in {@link InstabugInvocationEvent}.
     * @example <p>Here's an example usage: </p>
     * <blockquote><pre>
     * RNInstabug.getInstance().init(
     *     this,
     *     "your_token_here",
     *     LogLevel.VERBOSE,
     *     InstabugInvocationEvent.SHAKE,
     *     ... // Other invocation events
     * );
     * </pre></blockquote>
     */
    public void init(
            @NonNull Application application,
            @NonNull String applicationToken,
            int logLevel,
            String codePushVersion,
            String appVariant,
            Boolean ignoreSecureFlag,
            @NonNull InstabugInvocationEvent... InvocationEvent


            ) {
        try {

            setBaseUrlForDeprecationLogs();
            setCurrentPlatform();

           Instabug.Builder builder= new Instabug.Builder(application, applicationToken)
                    .setInvocationEvents(InvocationEvent)
                    .setSdkDebugLogsLevel(logLevel);

           if(codePushVersion!=null){
               builder.setCodePushVersion(codePushVersion);
           }
           if(appVariant!=null)
               builder.setAppVariant(appVariant);



            if (ignoreSecureFlag != null) {
                builder.ignoreFlagSecure(ignoreSecureFlag);
            }

            builder.build();


            // Temporarily disabling APM hot launches
            APM.setHotAppLaunchEnabled(false);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    /**
     * Initializes the SDK on the native side, which is useful for capturing startup issues specific to the native part of the app.
     *
     * @param application      The application context.
     * @param applicationToken The app's identifying token, available on your dashboard.
     * @param invocationEvent  The events that trigger the SDK's user interface.
     *                         Choose from the available events listed in {@link InstabugInvocationEvent}.
     * @example <p>Here's an example usage: </p>
     * <blockquote><pre>
     * RNInstabug.getInstance().init(
     *     this,
     *     "your_token_here",
     *     InstabugInvocationEvent.SHAKE,
     *     ... // Other invocation events
     * );
     * </pre></blockquote>
     */
    public void init(
            @NonNull Application application,
            @NonNull String applicationToken,
            String codePushVersion,
            String appVariant,
            @NonNull InstabugInvocationEvent... invocationEvent
    ) {
        init(application, applicationToken, LogLevel.ERROR,codePushVersion,appVariant, null,invocationEvent);
    }

    @VisibleForTesting
    public void setCurrentPlatform() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.Instabug"), "setCurrentPlatform", int.class);
            if (method != null) {
                Log.i("IBG-CP-Bridge", "invoking setCurrentPlatform with platform: " + Platform.RN);
                method.invoke(null, Platform.RN);
            } else {
                Log.e("IBG-CP-Bridge", "setCurrentPlatform was not found by reflection");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @VisibleForTesting
    public void setBaseUrlForDeprecationLogs() {
        try {
            Method method = InstabugUtil.getMethod(Class.forName("com.instabug.library.util.InstabugDeprecationLogger"), "setBaseUrl", String.class);
            if (method != null) {
                method.invoke(null, "https://docs.instabug.com/docs/react-native-sdk-migration-guide");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static class Builder {

        /**
         * Application instance to initialize Instabug.
         */
        private Application application;

        /**
         * The application token obtained from the Instabug dashboard.
         */
        private String applicationToken;

        /**
         * The level of detail in logs that you want to print.
         */
        private int logLevel = LogLevel.ERROR;

        /**
         * The Code Push version to be used for all reports.
         */
        private String codePushVersion;

        /**
         * The overAirUpdate Version to be used for all reports.
         */
       private ReadableMap overAirVersion;

        /**
         * The events that trigger the SDK's user interface.
         */
        private InstabugInvocationEvent[] invocationEvents;
        /**
         * The App variant name to be used for all reports.
         */
        private String appVariant;

        private Boolean ignoreFlagSecure;


        /**
         * Initialize Instabug SDK with application token
         *
         * @param application      Application object for initialization of library
         * @param applicationToken The app's identifying token, available on your dashboard.
         */
        public Builder(Application application, String applicationToken) {
            this.application = application;
            this.applicationToken = applicationToken;
        }

        /**
         * Initialize Instabug SDK with application token and invocation trigger events
         *
         * @param application      Application object for initialization of library
         * @param applicationToken The app's identifying token, available on your dashboard.
         * @param invocationEvents The events that trigger the SDK's user interface.
         *                         <p>Choose from the available events listed in {@link InstabugInvocationEvent}.</p>
         */
        public Builder(Application application, String applicationToken, InstabugInvocationEvent... invocationEvents) {
            this.application = application;
            this.applicationToken = applicationToken;
            this.invocationEvents = invocationEvents;
        }

        /**
         * Sets the filtering level for printed SDK logs.
         *
         * @param logLevel The log filtering level to be set.
         *                 Choose from {@link LogLevel} constants:
         *                 {@link LogLevel#NONE}, {@link LogLevel#ERROR}, {@link LogLevel#DEBUG}, or {@link LogLevel#VERBOSE}.
         *                 <p>Default level is {@link LogLevel#ERROR}.</p>
         */
        public Builder setLogLevel(int logLevel) {
            this.logLevel = logLevel;
            return this;
        }

        /**
         * Sets Code Push version to be used for all reports.
         *
         * @param codePushVersion the Code Push version to work with.
         */
        public Builder setCodePushVersion(String codePushVersion) {
            this.codePushVersion = codePushVersion;
            return this;
        }

       /**
        * Sets over air update version to be used for all reports.
        *
        * @param overAirVersion the over air update version and service map.
        */
       public Builder setOverAirVersion(ReadableMap overAirVersion) {
           this.overAirVersion = overAirVersion;
           return this;
       }

        /**
         * Sets flag to override SDK screenshot security behavior.
         *
         * @param ignoreFlagSecure flag to override SDK screenshot security behavior.
         */
        public Builder ignoreFlagSecure(boolean ignoreFlagSecure) {
            this.ignoreFlagSecure = ignoreFlagSecure;
            return this;
        }

        /**
         * Sets the invocation triggering events for the SDK's user interface
         *
         * @param invocationEvents The events that trigger the SDK's user interface.
         *                         Choose from the available events listed in {@link InstabugInvocationEvent}.
         */
        public Builder setInvocationEvents(InstabugInvocationEvent... invocationEvents) {
            this.invocationEvents = invocationEvents;
            return this;
        }

        /**
         * Sets the the current App variant
         *
         * @param appVariant the current App variant to work with.
         */
        public Builder setAppVariant(String appVariant) {
            this.appVariant = appVariant;
            return this;
        }

        /**
         * Builds the Instabug instance with the provided configurations.
         */
        public void build() {
            try {
                RNInstabug.getInstance().setBaseUrlForDeprecationLogs();
                RNInstabug.getInstance().setCurrentPlatform();

                Instabug.Builder instabugBuilder = new Instabug.Builder(application, applicationToken)
                        .setInvocationEvents(invocationEvents)
                        .setSdkDebugLogsLevel(logLevel);

                if (codePushVersion != null) {
                    instabugBuilder.setCodePushVersion(codePushVersion);
                }
                if(appVariant!=null){
                    instabugBuilder.setAppVariant(appVariant);
                }

                if (ignoreFlagSecure != null) {
                    instabugBuilder.ignoreFlagSecure(ignoreFlagSecure);
                }

               if (overAirVersion != null ) {
                   if (overAirVersion.hasKey("service") && overAirVersion.hasKey("version"))
                   {
                       if (overAirVersion.getString("service")!=null && overAirVersion.getString("version")!=null)
                       {
                           instabugBuilder.setOverAirVersion(overAirVersion.getString("version"),
                               ArgsRegistry.overAirUpdateService.get(overAirVersion.getString("service")));
                       }
                   }
               }

                instabugBuilder.build();

                // Temporarily disabling APM hot launches
                APM.setHotAppLaunchEnabled(false);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
