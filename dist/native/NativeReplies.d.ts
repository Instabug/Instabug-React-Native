import { NativeEventEmitter, NativeModule } from 'react-native';
export interface RepliesNativeModule extends NativeModule {
    setEnabled(isEnabled: boolean): void;
    show(): void;
    hasChats(): Promise<boolean>;
    getUnreadRepliesCount(): Promise<number>;
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
export declare const NativeReplies: RepliesNativeModule;
export declare enum NativeEvents {
    ON_REPLY_RECEIVED_HANDLER = "IBGOnNewReplyReceivedCallback"
}
export declare const emitter: NativeEventEmitter;
