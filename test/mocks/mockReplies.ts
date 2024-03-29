import type { RepliesNativeModule } from '../../src/native/NativeReplies';

const mockReplies: RepliesNativeModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  setEnabled: jest.fn(),
  hasChats: jest.fn(),
  show: jest.fn(),
  setOnNewReplyReceivedHandler: jest.fn(),
  getUnreadRepliesCount: jest.fn(),
  setInAppNotificationEnabled: jest.fn(),
  setInAppNotificationSound: jest.fn(),
  setPushNotificationsEnabled: jest.fn(),
  setPushNotificationRegistrationToken: jest.fn(),
  showNotification: jest.fn(),
  setNotificationIcon: jest.fn(),
  setPushNotificationChannelId: jest.fn(),
  setSystemReplyNotificationSoundEnabled: jest.fn(),
};

export default mockReplies;
