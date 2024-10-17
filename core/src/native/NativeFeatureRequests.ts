import type { NativeModule } from 'react-native';

import type { ActionType } from '../utils/Enums';
import { NativeModules } from './NativePackage';

export interface FeatureRequestsNativeModule extends NativeModule {
  setEnabled(isEnabled: boolean): void;
  show(): void;
  setEmailFieldRequiredForFeatureRequests(isEmailFieldRequired: boolean, types: ActionType[]): void;
}

export const NativeFeatureRequests = NativeModules.IBGFeatureRequests;
