import { NativeModules, Platform } from 'react-native';
import Replies from '../../src/modules/Replies';
import IBGConstants from '../../src/utils/InstabugConstants';
import IBGEventEmitter from '../../src/utils/IBGEventEmitter';

const { IBGReplies: NativeIBGReplies } = NativeModules;

describe('Replies Module', () => {
  it('should call the native method setRepliesEnabled', () => {
    Replies.setEnabled(true);

    expect(NativeIBGReplies.setEnabled).toBeCalledTimes(1);
    expect(NativeIBGReplies.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method showReplies', () => {
    Replies.show();

    expect(NativeIBGReplies.show).toBeCalledTimes(1);
  });

  it('should call the native method hasChats', () => {
    const callback = jest.fn();
    Replies.hasChats(callback);

    expect(NativeIBGReplies.hasChats).toBeCalledTimes(1);
    expect(NativeIBGReplies.hasChats).toBeCalledWith(callback);
    expect(callback).toBeCalledWith(true);
  });

  it('should call the native method setOnNewReplyReceivedCallback with a function', () => {
    const callback = jest.fn();
    Replies.setOnNewReplyReceivedHandler(callback);

    expect(NativeIBGReplies.setOnNewReplyReceivedHandler).toBeCalledTimes(1);
    expect(NativeIBGReplies.setOnNewReplyReceivedHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGOnNewReplyReceivedCallback', () => {
    const callback = jest.fn();
    Replies.setOnNewReplyReceivedHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_REPLY_RECEIVED_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_REPLY_RECEIVED_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method getUnreadRepliesCount', () => {
    const callback = jest.fn();
    Replies.getUnreadRepliesCount(callback);

    expect(NativeIBGReplies.getUnreadRepliesCount).toBeCalledTimes(1);
    expect(NativeIBGReplies.getUnreadRepliesCount).toBeCalledWith(callback);
    expect(callback).toBeCalledWith(2);
  });

  it('should call the native method setInAppNotificationEnabled', () => {
    Replies.setInAppNotificationsEnabled(true);

    expect(NativeIBGReplies.setInAppNotificationEnabled).toBeCalledTimes(1);
    expect(NativeIBGReplies.setInAppNotificationEnabled).toBeCalledWith(true);
  });

  it('should call the native method setInAppNotificationSound', () => {
    Platform.OS = 'android';
    Replies.setInAppNotificationSound(true);

    expect(NativeIBGReplies.setInAppNotificationSound).toBeCalledTimes(1);
    expect(NativeIBGReplies.setInAppNotificationSound).toBeCalledWith(true);
  });

  it('should not call the native method setEnableInAppNotificationSound when Platform.OS is ios', () => {
    Platform.OS = 'ios';
    Replies.setInAppNotificationSound(true);

    expect(NativeIBGReplies.setInAppNotificationSound).not.toBeCalled();
  });

  it('should call the native method setPushNotificationsEnabled', () => {
    Replies.setPushNotificationsEnabled(true);

    expect(NativeIBGReplies.setPushNotificationsEnabled).toBeCalledTimes(1);
    expect(NativeIBGReplies.setPushNotificationsEnabled).toBeCalledWith(true);
  });

  it('should call the native method setPushNotificationRegistrationToken on Android', () => {
    Platform.OS = 'android';
    Replies.setPushNotificationRegistrationTokenAndroid('123');

    expect(NativeIBGReplies.setPushNotificationRegistrationToken).toBeCalledTimes(1);
    expect(NativeIBGReplies.setPushNotificationRegistrationToken).toBeCalledWith('123');
  });

  it('should call the native method showNotification on Android', () => {
    Platform.OS = 'android';
    Replies.showNotificationAndroid('test');

    expect(NativeIBGReplies.showNotification).toBeCalledTimes(1);
    expect(NativeIBGReplies.showNotification).toBeCalledWith('test');
  });

  it('should not call the native method setPushNotificationRegistrationToken on iOS', () => {
    Platform.OS = 'ios';
    Replies.setPushNotificationRegistrationTokenAndroid(true);

    expect(NativeIBGReplies.setPushNotificationRegistrationToken).not.toBeCalled();
  });

  it('should call the native method setNotificationIcon on Android', () => {
    Platform.OS = 'android';
    Replies.setNotificationIconAndroid(123);

    expect(NativeIBGReplies.setNotificationIcon).toBeCalledTimes(1);
    expect(NativeIBGReplies.setNotificationIcon).toBeCalledWith(123);
  });

  it('should not call the native method setNotificationIcon on iOS', () => {
    Platform.OS = 'ios';
    Replies.setNotificationIconAndroid(123);

    expect(NativeIBGReplies.setNotificationIcon).not.toBeCalled();
  });

  it('should call the native method setPushNotificationChannelId on Android', () => {
    Platform.OS = 'android';
    Replies.setPushNotificationChannelIdAndroid('123');

    expect(NativeIBGReplies.setPushNotificationChannelId).toBeCalledTimes(1);
    expect(NativeIBGReplies.setPushNotificationChannelId).toBeCalledWith('123');
  });

  it('should not call the native method setPushNotificationChannelId on iOS', () => {
    Platform.OS = 'ios';
    Replies.setPushNotificationChannelIdAndroid('123');

    expect(NativeIBGReplies.setPushNotificationChannelId).not.toBeCalled();
  });

  it('should call the native method setSystemReplyNotificationSoundEnabled on Android', () => {
    Platform.OS = 'android';
    Replies.setSystemReplyNotificationSoundEnabledAndroid(true);

    expect(NativeIBGReplies.setSystemReplyNotificationSoundEnabled).toBeCalledTimes(1);
    expect(NativeIBGReplies.setSystemReplyNotificationSoundEnabled).toBeCalledWith(true);
  });

  it('should not call the native method setSystemReplyNotificationSoundEnabled on iOS', () => {
    Platform.OS = 'ios';
    Replies.setSystemReplyNotificationSoundEnabledAndroid(true);

    expect(NativeIBGReplies.setSystemReplyNotificationSoundEnabled).not.toBeCalled();
  });
});
