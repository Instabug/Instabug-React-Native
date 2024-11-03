const InstabugConstants = {
  GRAPHQL_HEADER: 'ibg-graphql-header',

  // TODO: dyanmically get the max size from the native SDK and update the error message to reflect the dynamic size.
  MAX_NETWORK_BODY_SIZE_IN_BYTES: 1024 * 10, // 10 KB
  MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE:
    'The response body has not been logged because it exceeds the maximum size of 10 Kb',
  MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE:
    'The request body has not been logged because it exceeds the maximum size of 10 Kb',
  IBG_APM_TAG: 'IBG-APM: ',
  SWITCHED_TO_NATIVE_INTERCEPTION_MESSAGE:
    'Android Plugin Detected. Switched to Native Interception.',
  PLUGIN_NOT_INSTALLED_MESSAGE:
    'Network Spans will not be captured as Android Plugin is not installed. Disabling Native Interception to minimize data loss.',
  NATIVE_INTERCEPTION_DISABLED_MESSAGE:
    'Network Spans capture is disabled by Instabug. Disabling native interception to avoid data loss.',
};

export default InstabugConstants;
