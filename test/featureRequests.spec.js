/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules } from 'react-native';
import './jest/mockFeatureRequests';
import FeatureRequests from '../src/modules/FeatureRequests'

const { IBGFeatureRequests: NativeIBGFeatureRequests } = NativeModules;

describe('Feature Requests Module', () => {
  it('should call the native method setEmailFieldRequiredForFeatureRequests', () => {

    const actionTypes = [FeatureRequests.actionTypes.reportBug]
    FeatureRequests.setEmailFieldRequired(true, actionTypes);

    expect(NativeIBGFeatureRequests.setEmailFieldRequiredForFeatureRequests).toBeCalledTimes(1);
    expect(NativeIBGFeatureRequests.setEmailFieldRequiredForFeatureRequests).toBeCalledWith(true, actionTypes);

  });

  it('should call the native method showFeatureRequests', () => {

    FeatureRequests.show();

    expect(NativeIBGFeatureRequests.show).toBeCalledTimes(1);

  });

  it('should call the native method setEnabled', () => {

    FeatureRequests.setEnabled(true);

    expect(NativeIBGFeatureRequests.setEnabled).toBeCalledTimes(1);
    expect(NativeIBGFeatureRequests.setEnabled).toBeCalledWith(true);

  });

});
