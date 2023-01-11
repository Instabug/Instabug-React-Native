var InstabugConstants;
(function (InstabugConstants) {
    InstabugConstants["NETWORK_DATA_OBFUSCATION_HANDLER_EVENT"] = "IBGSetNetworkDataObfuscationHandler";
    InstabugConstants["PRESENDING_HANDLER"] = "IBGpreSendingHandler";
    InstabugConstants["SEND_HANDLED_CRASH"] = "IBGSendHandledJSCrash";
    InstabugConstants["SEND_UNHANDLED_CRASH"] = "IBGSendUnhandledJSCrash";
    InstabugConstants["ON_INVOKE_HANDLER"] = "IBGpreInvocationHandler";
    InstabugConstants["ON_SDK_DISMISSED_HANDLER"] = "IBGpostInvocationHandler";
    InstabugConstants["ON_REPLY_RECEIVED_HANDLER"] = "IBGOnNewReplyReceivedCallback";
    InstabugConstants["WILL_SHOW_SURVEY_HANDLER"] = "IBGWillShowSurvey";
    InstabugConstants["DID_DISMISS_SURVEY_HANDLER"] = "IBGDidDismissSurvey";
    InstabugConstants["DID_SELECT_PROMPT_OPTION_HANDLER"] = "IBGDidSelectPromptOptionHandler";
    InstabugConstants["GRAPHQL_HEADER"] = "ibg-graphql-header";
})(InstabugConstants || (InstabugConstants = {}));
export default InstabugConstants;
