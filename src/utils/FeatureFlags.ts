import { NativeInstabug } from '../native/NativeInstabug';
import { _registerFeatureFlagsChangeListener } from '../modules/Instabug';

export const FeatureFlags = {
  isW3ExternalTraceID: () => NativeInstabug.isW3ExternalTraceIDEnabled(),
  isW3ExternalGeneratedHeader: () => NativeInstabug.isW3ExternalGeneratedHeaderEnabled(),
  isW3CaughtHeader: () => NativeInstabug.isW3CaughtHeaderEnabled(),
  networkLogLimit: () => NativeInstabug.getNetworkBodyMaxSize(),
};

export const registerFeatureFlagsListener = () => {
  _registerFeatureFlagsChangeListener(
    (res: {
      isW3ExternalTraceIDEnabled: boolean;
      isW3ExternalGeneratedHeaderEnabled: boolean;
      isW3CaughtHeaderEnabled: boolean;
      networkBodyLimit: number;
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
      FeatureFlags.networkLogLimit = async () => {
        return res.networkBodyLimit;
      };
    },
  );
};
