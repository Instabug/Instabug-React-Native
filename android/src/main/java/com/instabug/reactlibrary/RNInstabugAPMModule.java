
package com.instabug.reactlibrary;

import static com.instabug.reactlibrary.utils.InstabugUtil.getMethod;

import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.instabug.apm.APM;
import com.instabug.apm.networking.APMNetworkLogger;
import com.instabug.apm.networkinterception.cp.APMCPNetworkLog;
import com.instabug.reactlibrary.utils.EventEmitterModule;
import com.instabug.reactlibrary.utils.MainThreadHandler;

import java.lang.reflect.Method;
import java.util.HashMap;

import javax.annotation.Nonnull;

public class RNInstabugAPMModule extends EventEmitterModule {

    public RNInstabugAPMModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }


    @Nonnull
    @Override
    public String getName() {
        return "IBGAPM";
    }

    /**
     * Pauses the current thread for 3 seconds.
     */
    @ReactMethod
    public void ibgSleep() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                SystemClock.sleep(3000);
            }
        });
    }

    /**
     * Enables or disables APM.
     *
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables app launch tracking.
     *
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setAppLaunchEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setColdAppLaunchEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * This method is used to signal the end of the app launch process.
     */
    @ReactMethod
    public void endAppLaunch() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.endAppLaunch();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Enables or disables auto UI tracing
     *
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setAutoUITraceEnabled(final boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setAutoUITraceEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Starts an AppFlow with the specified name.
     * <br/>
     * On starting two flows with the same name the older flow will end with force abandon end reason.
     * AppFlow name cannot exceed 150 characters otherwise it's truncated,
     * leading and trailing whitespaces are also ignored.
     *
     * @param name AppFlow name. It can not be empty string or null.
     *             Starts a new AppFlow, if APM is enabled, feature is enabled
     *             and Instabug SDK is initialised.
     */
    @ReactMethod
    public void startFlow(@NonNull final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.startFlow(name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Sets custom attributes for AppFlow with a given name.
     * <br/>
     * Setting an attribute value to null will remove its corresponding key if it already exists.
     * <br/>
     * Attribute key name cannot exceed 30 characters.
     * Leading and trailing whitespaces are also ignored.
     * Does not accept empty strings or null.
     * <br/>
     * Attribute value name cannot exceed 60 characters,
     * leading and trailing whitespaces are also ignored.
     * Does not accept empty strings.
     * <br/>
     * If a trace is ended, attributes will not be added and existing ones will not be updated.
     * <br/>
     *
     * @param name  AppFlow name. It can not be empty string or null
     * @param key   AppFlow attribute key. It can not be empty string or null
     * @param value AppFlow attribute value. It can not be empty string. Null to remove attribute
     */
    @ReactMethod
    public void setFlowAttribute(@NonNull final String name, @NonNull final String key, final String value) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setFlowAttribute(name, key, value);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Ends AppFlow with a given name.
     *
     * @param name AppFlow name to be ended. It can not be empty string or null
     */
    @ReactMethod
    public void endFlow(@NonNull final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.endFlow(name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Starts a UI trace
     *
     * @param name string name of the UI trace.
     */
    @ReactMethod
    public void startUITrace(final String name) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.startUITrace(name);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * This method is used to terminate the currently active UI trace.
     */
    @ReactMethod
    public void endUITrace() {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.endUITrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * The `networkLogAndroid` function logs network-related information using APMNetworkLogger in a React
     * Native module.
     *
     * @param requestStartTime    The `requestStartTime` parameter in the `networkLogAndroid` method
     *                            represents the timestamp when the network request started. It is of type `double` and is passed as
     *                            a parameter to log network-related information.
     * @param requestDuration     The `requestDuration` parameter in the `networkLogAndroid` method represents
     *                            the duration of the network request in milliseconds. It indicates the time taken for the request to
     *                            complete from the moment it was initiated until the response was received. This parameter helps in
     *                            measuring the performance of network requests and identifying any potential
     * @param requestHeaders      requestHeaders is a string parameter that contains the headers of the network
     *                            request. It typically includes information such as the content type, authorization token, and any
     *                            other headers that were sent with the request.
     * @param requestBody         The `requestBody` parameter in the `networkLogAndroid` method represents the
     *                            body of the HTTP request being logged. It contains the data that is sent as part of the request to
     *                            the server. This could include form data, JSON payload, XML data, or any other content that is
     *                            being transmitted
     * @param requestBodySize     The `requestBodySize` parameter in the `networkLogAndroid` method represents
     *                            the size of the request body in bytes. It is a double value that indicates the size of the request
     *                            body being sent in the network request. This parameter is used to log information related to the
     *                            network request, including details
     * @param requestMethod       The `requestMethod` parameter in the `networkLogAndroid` method represents the
     *                            HTTP method used in the network request, such as GET, POST, PUT, DELETE, etc. It indicates the type
     *                            of operation that the client is requesting from the server.
     * @param requestUrl          The `requestUrl` parameter in the `networkLogAndroid` method represents the URL
     *                            of the network request being logged. It typically contains the address of the server to which the
     *                            request is being made, along with any additional path or query parameters required for the request.
     *                            This URL is essential for identifying the
     * @param requestContentType  The `requestContentType` parameter in the `networkLogAndroid` method
     *                            represents the content type of the request being made. This could be values like
     *                            "application/json", "application/xml", "text/plain", etc., indicating the format of the data being
     *                            sent in the request body. It helps in specifying
     * @param responseHeaders     The `responseHeaders` parameter in the `networkLogAndroid` method represents
     *                            the headers of the response received from a network request. These headers typically include
     *                            information such as content type, content length, server information, and any other metadata
     *                            related to the response. The `responseHeaders` parameter is expected to
     * @param responseBody        The `responseBody` parameter in the `networkLogAndroid` method represents the
     *                            body of the response received from a network request. It contains the data or content sent back by
     *                            the server in response to the request made by the client. This could be in various formats such as
     *                            JSON, XML, HTML
     * @param responseBodySize    The `responseBodySize` parameter in the `networkLogAndroid` method
     *                            represents the size of the response body in bytes. It is a double value that indicates the size of
     *                            the response body received from the network request. This parameter is used to log information
     *                            related to the network request and response, including
     * @param statusCode          The `statusCode` parameter in the `networkLogAndroid` method represents the HTTP
     *                            status code of the network request/response. It indicates the status of the HTTP response, such as
     *                            success (200), redirection (3xx), client errors (4xx), or server errors (5xx). This parameter is
     * @param responseContentType The `responseContentType` parameter in the `networkLogAndroid` method
     *                            represents the content type of the response received from the network request. It indicates the
     *                            format of the data in the response, such as JSON, XML, HTML, etc. This information is useful for
     *                            understanding how to parse and handle the
     * @param errorDomain         The `errorDomain` parameter in the `networkLogAndroid` method is used to specify
     *                            the domain of an error, if any occurred during the network request. If there was no error, this
     *                            parameter will be `null`.
     * @param w3cAttributes       The `w3cAttributes` parameter in the `networkLogAndroid` method is a
     *                            ReadableMap object that contains additional attributes related to W3C external trace. It may
     *                            include the following key-value pairs:
     * @param gqlQueryName        The `gqlQueryName` parameter in the `networkLogAndroid` method represents the
     *                            name of the GraphQL query being executed. It is a nullable parameter, meaning it can be null if no
     *                            GraphQL query name is provided. This parameter is used to log information related to GraphQL
     *                            queries in the network logging
     * @param serverErrorMessage  The `serverErrorMessage` parameter in the `networkLogAndroid` method is
     *                            used to pass any error message received from the server during network communication. This message
     *                            can provide additional details about any errors that occurred on the server side, helping in
     *                            debugging and troubleshooting network-related issues.
     */
    @ReactMethod
    private void networkLogAndroid(final double requestStartTime,
                                   final double requestDuration,
                                   final String requestHeaders,
                                   final String requestBody,
                                   final double requestBodySize,
                                   final String requestMethod,
                                   final String requestUrl,
                                   final String requestContentType,
                                   final String responseHeaders,
                                   final String responseBody,
                                   final double responseBodySize,
                                   final double statusCode,
                                   final String responseContentType,
                                   @Nullable final String errorDomain,
                                   @Nullable final ReadableMap w3cAttributes,
                                   @Nullable final String gqlQueryName,
                                   @Nullable final String serverErrorMessage
    ) {
        try {
            APMNetworkLogger networkLogger = new APMNetworkLogger();

            final boolean hasError = errorDomain != null && !errorDomain.isEmpty();
            final String errorMessage = hasError ? errorDomain : null;
            Boolean isW3cHeaderFound = false;
            Long partialId = null;
            Long networkStartTimeInSeconds = null;


            try {
                if (!w3cAttributes.isNull("isW3cHeaderFound")) {
                    isW3cHeaderFound = w3cAttributes.getBoolean("isW3cHeaderFound");
                }

                if (!w3cAttributes.isNull("partialId")) {
                    partialId = (long) w3cAttributes.getDouble("partialId");
                    networkStartTimeInSeconds = (long) w3cAttributes.getDouble("networkStartTimeInSeconds");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
            APMCPNetworkLog.W3CExternalTraceAttributes w3cExternalTraceAttributes =
                    new APMCPNetworkLog.W3CExternalTraceAttributes(
                            isW3cHeaderFound,
                            partialId,
                            networkStartTimeInSeconds,
                            w3cAttributes.getString("w3cGeneratedHeader"),
                            w3cAttributes.getString("w3cCaughtHeader")
                    );
            try {
                Method method = getMethod(Class.forName("com.instabug.apm.networking.APMNetworkLogger"), "log", long.class, long.class, String.class, String.class, long.class, String.class, String.class, String.class, String.class, String.class, long.class, int.class, String.class, String.class, String.class, String.class, APMCPNetworkLog.W3CExternalTraceAttributes.class);
                if (method != null) {
                    method.invoke(
                            networkLogger,
                            (long) requestStartTime * 1000,
                            (long) requestDuration,
                            requestHeaders,
                            requestBody,
                            (long) requestBodySize,
                            requestMethod,
                            requestUrl,
                            requestContentType,
                            responseHeaders,
                            responseBody,
                            (long) responseBodySize,
                            (int) statusCode,
                            responseContentType,
                            errorMessage,
                            gqlQueryName,
                            serverErrorMessage,
                            w3cExternalTraceAttributes
                    );
                } else {
                    Log.e("IB-CP-Bridge", "APMNetworkLogger.log was not found by reflection");
                }
            } catch (Throwable e) {
                e.printStackTrace();
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }


    /**
     * Enables or disables screen rendering
     *
     * @param isEnabled boolean indicating enabled or disabled.
     */
    @ReactMethod
    public void setScreenRenderEnabled(boolean isEnabled) {
        MainThreadHandler.runOnMainThread(new Runnable() {
            @Override
            public void run() {
                try {
                    APM.setScreenRenderingEnabled(isEnabled);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
