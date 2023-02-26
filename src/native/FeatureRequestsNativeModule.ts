import type { NativeModule } from 'react-native';

import type { actionTypes } from '../utils/ArgsRegistry';
import type { ActionType } from '../utils/Enums';

export interface FeatureRequestsNativeModule extends NativeModule {
  setEnabled(isEnabled: boolean): void;
  show(): void;
  setEmailFieldRequiredForFeatureRequests(
    isEmailFieldRequired: boolean,
    types: actionTypes[] | ActionType[],
  ): void;
}
