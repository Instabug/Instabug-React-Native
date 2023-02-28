import type { NativeModule } from 'react-native';

import { NativeModules } from './NativePackage';

export interface RepliesNativeModule extends NativeModule {
  // Essential APIs //
  setEnabled(isEnabled: boolean): void;
  show(): void;
  hasChats(callback: (hasChats: boolean) => void): void;
  getUnreadRepliesCount(callback: (count: number) => void): void;

  // Callbacks //
  setOnNewReplyReceivedHandler(handler: () => void): void;

  // Notifications APIs //
  setPushNotificationsEnabled(isEnabled: boolean): void;
  setInAppNotificationEnabled(isEnabled: boolean): void;

  // Android Notifications APIs //
  setInAppNotificationSound(isEnabled: boolean): void;
  setPushNotificationRegistrationToken(token: string): void;
  showNotification(data: Record<string, string>): void;
  setNotificationIcon(resourceId: number): void;
  setPushNotificationChannelId(id: string): void;
  setSystemReplyNotificationSoundEnabled(isEnabled: boolean): void;
}

export const NativeReplies = NativeModules.IBGReplies;
