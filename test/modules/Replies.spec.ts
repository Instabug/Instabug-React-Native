import { Platform } from 'react-native';

import { mocked } from 'jest-mock';

import * as Replies from '../../src/modules/Replies';
import { NativeEvents, NativeReplies, emitter } from '../../src/native/NativeReplies';

describe('Replies Module', () => {
  beforeEach(() => {
    const events = Object.values(NativeEvents);
    events.forEach((event) => {
      emitter.removeAllListeners(event);
    });
  });

  it('should call the native method setRepliesEnabled', () => {
    Replies.setEnabled(true);

    expect(NativeReplies.setEnabled).toBeCalledTimes(1);
    expect(NativeReplies.setEnabled).toBeCalledWith(true);
  });

  it('should call the native method showReplies', () => {
    Replies.show();

    expect(NativeReplies.show).toBeCalledTimes(1);
  });

  it('should call the native method hasChats', async () => {
    const expected = true;

    mocked(NativeReplies).hasChats.mockResolvedValueOnce(expected);

    const actual = await Replies.hasChats();

    expect(actual).toBe(expected);
    expect(NativeReplies.hasChats).toBeCalledTimes(1);
    expect(NativeReplies.hasChats).toBeCalledWith();
  });

  it('should call the native method setOnNewReplyReceivedCallback with a function', () => {
    const callback = jest.fn();
    Replies.setOnNewReplyReceivedHandler(callback);

    expect(NativeReplies.setOnNewReplyReceivedHandler).toBeCalledTimes(1);
    expect(NativeReplies.setOnNewReplyReceivedHandler).toBeCalledWith(callback);
  });

  it('should invoke callback on emitting the event IBGOnNewReplyReceivedCallback', () => {
    const callback = jest.fn();
    Replies.setOnNewReplyReceivedHandler(callback);
    emitter.emit(NativeEvents.ON_REPLY_RECEIVED_HANDLER);

    expect(emitter.listenerCount(NativeEvents.ON_REPLY_RECEIVED_HANDLER)).toBe(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should call the native method getUnreadRepliesCount', async () => {
    const expected = 10;

    mocked(NativeReplies).getUnreadRepliesCount.mockResolvedValueOnce(expected);

    const actual = await Replies.getUnreadRepliesCount();

    expect(actual).toBe(expected);
    expect(NativeReplies.getUnreadRepliesCount).toBeCalledTimes(1);
    expect(NativeReplies.getUnreadRepliesCount).toBeCalledWith();
  });

  it('should call the native method setInAppNotificationEnabled', () => {
    Replies.setInAppNotificationsEnabled(true);

    expect(NativeReplies.setInAppNotificationEnabled).toBeCalledTimes(1);
    expect(NativeReplies.setInAppNotificationEnabled).toBeCalledWith(true);
  });

  it('should call the native method setInAppNotificationSound', () => {
    Platform.OS = 'android';
    Replies.setInAppNotificationSound(true);

    expect(NativeReplies.setInAppNotificationSound).toBeCalledTimes(1);
    expect(NativeReplies.setInAppNotificationSound).toBeCalledWith(true);
  });

  it('should not call the native method setEnableInAppNotificationSound when Platform.OS is ios', () => {
    Platform.OS = 'ios';
    Replies.setInAppNotificationSound(true);

    expect(NativeReplies.setInAppNotificationSound).not.toBeCalled();
  });

  it('should call the native method setPushNotificationsEnabled', () => {
    Replies.setPushNotificationsEnabled(true);

    expect(NativeReplies.setPushNotificationsEnabled).toBeCalledTimes(1);
    expect(NativeReplies.setPushNotificationsEnabled).toBeCalledWith(true);
  });

  it('should call the native method setPushNotificationRegistrationToken on Android', () => {
    Platform.OS = 'android';
    Replies.setPushNotificationRegistrationTokenAndroid('123');

    expect(NativeReplies.setPushNotificationRegistrationToken).toBeCalledTimes(1);
    expect(NativeReplies.setPushNotificationRegistrationToken).toBeCalledWith('123');
  });

  it('should call the native method showNotification on Android', () => {
    Platform.OS = 'android';
    const data = { id: '2' };

    Replies.showNotificationAndroid(data);

    expect(NativeReplies.showNotification).toBeCalledTimes(1);
    expect(NativeReplies.showNotification).toBeCalledWith(data);
  });

  it('should not call the native method showNotification if platform is ios', () => {
    Platform.OS = 'ios';
    Replies.showNotificationAndroid({ id: '2' });

    expect(NativeReplies.showNotification).not.toBeCalled();
  });

  it('should not call the native method setPushNotificationRegistrationToken on iOS', () => {
    Platform.OS = 'ios';
    Replies.setPushNotificationRegistrationTokenAndroid('2');

    expect(NativeReplies.setPushNotificationRegistrationToken).not.toBeCalled();
  });

  it('should call the native method setNotificationIcon on Android', () => {
    Platform.OS = 'android';
    Replies.setNotificationIconAndroid(123);

    expect(NativeReplies.setNotificationIcon).toBeCalledTimes(1);
    expect(NativeReplies.setNotificationIcon).toBeCalledWith(123);
  });

  it('should not call the native method setNotificationIcon on iOS', () => {
    Platform.OS = 'ios';
    Replies.setNotificationIconAndroid(123);

    expect(NativeReplies.setNotificationIcon).not.toBeCalled();
  });

  it('should call the native method setPushNotificationChannelId on Android', () => {
    Platform.OS = 'android';
    Replies.setPushNotificationChannelIdAndroid('123');

    expect(NativeReplies.setPushNotificationChannelId).toBeCalledTimes(1);
    expect(NativeReplies.setPushNotificationChannelId).toBeCalledWith('123');
  });

  it('should not call the native method setPushNotificationChannelId on iOS', () => {
    Platform.OS = 'ios';
    Replies.setPushNotificationChannelIdAndroid('123');

    expect(NativeReplies.setPushNotificationChannelId).not.toBeCalled();
  });

  it('should call the native method setSystemReplyNotificationSoundEnabled on Android', () => {
    Platform.OS = 'android';
    Replies.setSystemReplyNotificationSoundEnabledAndroid(true);

    expect(NativeReplies.setSystemReplyNotificationSoundEnabled).toBeCalledTimes(1);
    expect(NativeReplies.setSystemReplyNotificationSoundEnabled).toBeCalledWith(true);
  });

  it('should not call the native method setSystemReplyNotificationSoundEnabled on iOS', () => {
    Platform.OS = 'ios';
    Replies.setSystemReplyNotificationSoundEnabledAndroid(true);

    expect(NativeReplies.setSystemReplyNotificationSoundEnabled).not.toBeCalled();
  });
});
