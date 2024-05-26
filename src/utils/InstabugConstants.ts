const InstabugConstants = {
  GRAPHQL_HEADER: 'ibg-graphql-header',

  // TODO: dyanmically get the max size from the native SDK and update the error message to reflect the dynamic size.
  MAX_NETWORK_BODY_SIZE_IN_BYTES: 1024 * 10, // 10 KB
  MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE:
    'The response body has not been logged because it exceeds the maximum size of 10 Kb',
  MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE:
    'The request body has not been logged because it exceeds the maximum size of 10 Kb',
};

export const MockedFeatureFlags = {
  w3c_external_trace_id_enabled: false,
  w3c_generated_header: true,
  w3c_caught_header: true,
};

export default InstabugConstants;
