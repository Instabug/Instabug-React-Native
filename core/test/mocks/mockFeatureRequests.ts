import type { FeatureRequestsNativeModule } from '../../src/native/NativeFeatureRequests';

const mockFeatureRequests: FeatureRequestsNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEmailFieldRequiredForFeatureRequests: jest.fn(),
  show: jest.fn(),
  setEnabled: jest.fn(),
};

export default mockFeatureRequests;
