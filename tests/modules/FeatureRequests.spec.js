import { NativeModules } from 'react-native';

import * as FeatureRequests from '../../src/modules/FeatureRequests';

const { IBGFeatureRequests: NativeFeatureRequests } = NativeModules;

describe('Feature Requests Module', () => {
  it('should call the native method setEmailFieldRequiredForFeatureRequests', () => {
    const actionTypes = [FeatureRequests.actionTypes.reportBug];
    FeatureRequests.setEmailFieldRequired(true, actionTypes);

    expect(NativeFeatureRequests.setEmailFieldRequiredForFeatureRequests).toBeCalledTimes(1);
    expect(NativeFeatureRequests.setEmailFieldRequiredForFeatureRequests).toBeCalledWith(
      true,
      actionTypes,
    );
  });

  it('should call the native method showFeatureRequests', () => {
    FeatureRequests.show();

    expect(NativeFeatureRequests.show).toBeCalledTimes(1);
  });

  it('should call the native method setEnabled', () => {
    FeatureRequests.setEnabled(true);

    expect(NativeFeatureRequests.setEnabled).toBeCalledTimes(1);
    expect(NativeFeatureRequests.setEnabled).toBeCalledWith(true);
  });
});
