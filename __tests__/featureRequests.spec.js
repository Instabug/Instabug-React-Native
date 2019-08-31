/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules } from 'react-native';
import '../jest/mockFeatureRequests';
import FeatureRequests from '../modules/FeatureRequests'
import sinon from 'sinon';

describe('Feature Requests Module', () => {
  
  const setEmailFieldRequiredForFeatureRequests = sinon.spy(NativeModules.IBGFeatureRequests, 'setEmailFieldRequiredForFeatureRequests');
  const showFeatureRequests = sinon.spy(NativeModules.IBGFeatureRequests, 'show');
  const setEnabled = sinon.spy(NativeModules.IBGFeatureRequests, 'setEnabled');

  it('should call the native method setEmailFieldRequiredForFeatureRequests', () => {

    const actionTypes = [FeatureRequests.actionTypes.reportBug]
    FeatureRequests.setEmailFieldRequired(true, actionTypes);

    expect(setEmailFieldRequiredForFeatureRequests.calledOnceWithExactly(true, actionTypes)).toBe(true);

  });

  it('should call the native method showFeatureRequests', () => {

    FeatureRequests.show();

    expect(showFeatureRequests.calledOnce).toBe(true);

  });

  it('should call the native method setEnabled', () => {

    FeatureRequests.setEnabled(true);

    expect(setEnabled.calledOnceWithExactly(true)).toBe(true);

  });

});
