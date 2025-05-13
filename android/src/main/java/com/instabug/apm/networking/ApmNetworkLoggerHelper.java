package com.instabug.apm.networking;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.instabug.apm.networking.mapping.NetworkRequestAttributes;
import com.instabug.apm.networkinterception.cp.APMCPNetworkLog;

public class ApmNetworkLoggerHelper {

    /// Log network request to the Android SDK using a package private API [APMNetworkLogger.log]
    static public void log(final double requestStartTime,
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
            final APMNetworkLogger apmNetworkLogger = new APMNetworkLogger();
            final boolean hasError = errorDomain != null && !errorDomain.isEmpty();
            final String errorMessage = hasError ? errorDomain : null;
            boolean isW3cHeaderFound = false;
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
            NetworkRequestAttributes requestAttributes = new NetworkRequestAttributes(
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
                    serverErrorMessage
            );

            apmNetworkLogger.log(
                    requestAttributes,
                    w3cExternalTraceAttributes
            );
        } catch (Throwable e) {
            e.printStackTrace();
        }

    }

}
