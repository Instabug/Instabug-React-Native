const InstabugConstants = {
    GRAPHQL_HEADER: 'ibg-graphql-header',
    // TODO: dyanmically get the max size from the native SDK and update the error message to reflect the dynamic size.
    MAX_NETWORK_BODY_SIZE_IN_BYTES: 1024 * 10,
    MAX_RESPONSE_BODY_SIZE_EXCEEDED_MESSAGE: 'The response body has not been logged because it exceeds the maximum size of 10 Kb',
    MAX_REQUEST_BODY_SIZE_EXCEEDED_MESSAGE: 'The request body has not been logged because it exceeds the maximum size of 10 Kb',
    SET_USER_ATTRIBUTES_ERROR_TYPE_MESSAGE: 'IBG-RN: Expected key and value passed to setUserAttribute to be of type string',
    REMOVE_USER_ATTRIBUTES_ERROR_TYPE_MESSAGE: 'IBG-RN: Expected key and value passed to removeUserAttribute to be of type string',
};
export default InstabugConstants;
