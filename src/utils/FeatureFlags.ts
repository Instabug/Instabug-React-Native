import * as NativeAPM from '../modules/APM';

export let FeatureFlags = {
  isW3ExternalTraceID: () => NativeAPM._isW3ExternalTraceIDEnabled(),
  isW3ExternalGeneratedHeader: () => NativeAPM._isW3ExternalGeneratedHeaderEnabled(),
  isW3CaughtHeader: () => NativeAPM._isW3CaughtHeaderEnabled(),
};

export const registerW3CFlagsListener = () => {
  NativeAPM._registerW3CFlagsChangeListener(
    (res: {
      isW3ExternalTraceIDEnabled: boolean;
      isW3ExternalGeneratedHeaderEnabled: boolean;
      isW3CaughtHeaderEnabled: boolean;
    }) => {
      FeatureFlags.isW3ExternalTraceID = async () => {
        return res.isW3ExternalTraceIDEnabled;
      };
      FeatureFlags.isW3ExternalGeneratedHeader = async () => {
        return res.isW3ExternalGeneratedHeaderEnabled;
      };
      FeatureFlags.isW3CaughtHeader = async () => {
        return res.isW3CaughtHeaderEnabled;
      };
    },
  );
};
