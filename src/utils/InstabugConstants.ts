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
    'Switched to Native Interception: Android Plugin Detected',
  PLUGIN_NOT_INSTALLED_MESSAGE: 'Network traces won’t get captured as plugin is not installed',
  PLUGIN_NOT_INSTALLED_AND_NATIVE_INTERCEPTION_DISABLED_MESSAGE:
    'Network traces won’t get captured as plugin is not installed and native interception is disabled from BE',
  NATIVE_INTERCEPTION_DISABLED_MESSAGE: 'Native interception is disabled',
};

export default InstabugConstants;
