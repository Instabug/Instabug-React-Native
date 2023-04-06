import type { NativeModule } from 'react-native';
export interface RepliesNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    show(): void;
    hasChats(callback: (hasChats: boolean) => void): void;
    getUnreadRepliesCount(callback: (count: number) => void): void;
    setOnNewReplyReceivedHandler(handler: () => void): void;
    setPushNotificationsEnabled(isEnabled: boolean): void;
    setInAppNotificationEnabled(isEnabled: boolean): void;
    setInAppNotificationSound(isEnabled: boolean): void;
    setPushNotificationRegistrationToken(token: string): void;
    showNotification(data: Record<string, string>): void;
    setNotificationIcon(resourceId: number): void;
    setPushNotificationChannelId(id: string): void;
    setSystemReplyNotificationSoundEnabled(isEnabled: boolean): void;
}
