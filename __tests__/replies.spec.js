/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules, Platform } from 'react-native';
import '../jest/mockReplies';
import sinon from 'sinon';
import Replies from '../modules/Replies';
import IBGConstants from '../utils/InstabugConstants';
import IBGEventEmitter from '../utils/IBGEventEmitter';

describe('Replies Module', () => {
  
  const setRepliesEnabled = sinon.spy(NativeModules.Instabug, 'setRepliesEnabled');
  const hasChats = sinon.spy(NativeModules.Instabug, 'hasChats');
  const showReplies = sinon.spy(NativeModules.Instabug, 'showReplies');
  const setOnNewReplyReceivedCallback = sinon.spy(NativeModules.Instabug, 'setOnNewReplyReceivedCallback');
  const getUnreadMessagesCount = sinon.spy(NativeModules.Instabug, 'getUnreadMessagesCount');
  const setChatNotificationEnabled = sinon.spy(NativeModules.Instabug, 'setChatNotificationEnabled');
  const setEnableInAppNotificationSound = sinon.spy(NativeModules.Instabug, 'setEnableInAppNotificationSound');

  beforeEach(() => {
    setOnNewReplyReceivedCallback.resetHistory();
    setEnableInAppNotificationSound.resetHistory();
  });

  it('should call the native method setRepliesEnabled', () => {

    Replies.setEnabled(true);

    expect(setRepliesEnabled.calledOnce).toBe(true);
    expect(setRepliesEnabled.calledWith(true)).toBe(true);

  });

  it('should call the native method showReplies', () => {

    Replies.show();

    expect(showReplies.calledOnce).toBe(true);

  });

  it('should call the native method hasChats', (done) => {

    const callback = (hasChats) => {
        expect(hasChats).toBe(true);
        done();
    }
    Replies.hasChats(callback);

    expect(hasChats.calledOnce).toBe(true);

  });

  it('should call the native method setOnNewReplyReceivedCallback with a function', () => {

    const callback = jest.fn()
    Replies.setOnNewReplyReceivedHandler(callback);

    expect(setOnNewReplyReceivedCallback.calledOnce).toBe(true);
    expect(setOnNewReplyReceivedCallback.calledWith(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGOnNewReplyReceivedCallback', () => {

    const callback = jest.fn()
    Replies.setOnNewReplyReceivedHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_REPLY_RECEIVED_HANDLER);

    expect(callback).toHaveBeenCalled();

  });

  it('should call the native method getUnreadMessagesCount', (done) => {

    const callback = (messagesCount) => {
        expect(messagesCount).toBe(2);
        done();
    }
    Replies.getUnreadRepliesCount(callback);

    expect(getUnreadMessagesCount.calledOnce).toBe(true);

  });

  it('should call the native method setChatNotificationEnabled', () => {

    Replies.setInAppNotificationsEnabled(true);

    expect(setChatNotificationEnabled.calledOnce).toBe(true);
    expect(setChatNotificationEnabled.calledWith(true)).toBe(true);

  });

  it('should call the native method setEnableInAppNotificationSound', () => {

    Platform.OS = 'android';
    Replies.setInAppNotificationSound(true);

    expect(setEnableInAppNotificationSound.calledOnce).toBe(true);
    expect(setEnableInAppNotificationSound.calledWith(true)).toBe(true);

  });

  it('should not call the native method setEnableInAppNotificationSound when Platform.OS is ios', () => {

    Platform.OS = 'ios';
    Replies.setInAppNotificationSound(true);

    expect(setEnableInAppNotificationSound.notCalled).toBe(true);

  });


});
