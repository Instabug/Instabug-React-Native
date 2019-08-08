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
  
  const setRepliesEnabled = sinon.spy(NativeModules.IBGReplies, 'setEnabled');
  const hasChats = sinon.spy(NativeModules.IBGReplies, 'hasChats');
  const showReplies = sinon.spy(NativeModules.IBGReplies, 'show');
  const setOnNewReplyReceivedCallback = sinon.spy(NativeModules.IBGReplies, 'setOnNewReplyReceivedHandler');
  const getUnreadMessagesCount = sinon.spy(NativeModules.IBGReplies, 'getUnreadRepliesCount');
  const setChatNotificationEnabled = sinon.spy(NativeModules.IBGReplies, 'setInAppNotificationEnabled');
  const setEnableInAppNotificationSound = sinon.spy(NativeModules.IBGReplies, 'setInAppNotificationSound');

  beforeEach(() => {
    setOnNewReplyReceivedCallback.resetHistory();
    setEnableInAppNotificationSound.resetHistory();
    IBGEventEmitter.removeAllListeners();
  });

  it('should call the native method setRepliesEnabled', () => {

    Replies.setEnabled(true);

    expect(setRepliesEnabled.calledOnceWithExactly(true)).toBe(true);

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

    expect(hasChats.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should call the native method setOnNewReplyReceivedCallback with a function', () => {

    const callback = jest.fn()
    Replies.setOnNewReplyReceivedHandler(callback);

    expect(setOnNewReplyReceivedCallback.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should invoke callback on emitting the event IBGOnNewReplyReceivedCallback', () => {

    const callback = jest.fn()
    Replies.setOnNewReplyReceivedHandler(callback);
    IBGEventEmitter.emit(IBGConstants.ON_REPLY_RECEIVED_HANDLER);

    expect(IBGEventEmitter.getListeners(IBGConstants.ON_REPLY_RECEIVED_HANDLER).length).toEqual(1);
    expect(callback).toHaveBeenCalled();

  });

  it('should call the native method getUnreadMessagesCount', (done) => {

    const callback = (messagesCount) => {
        expect(messagesCount).toBe(2);
        done();
    }
    Replies.getUnreadRepliesCount(callback);

    expect(getUnreadMessagesCount.calledOnceWithExactly(callback)).toBe(true);

  });

  it('should call the native method setChatNotificationEnabled', () => {

    Replies.setInAppNotificationsEnabled(true);

    expect(setChatNotificationEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method setEnableInAppNotificationSound', () => {

    Platform.OS = 'android';
    Replies.setInAppNotificationSound(true);

    expect(setEnableInAppNotificationSound.calledOnceWithExactly(true)).toBe(true);

  });

  it('should not call the native method setEnableInAppNotificationSound when Platform.OS is ios', () => {

    Platform.OS = 'ios';
    Replies.setInAppNotificationSound(true);

    expect(setEnableInAppNotificationSound.notCalled).toBe(true);

  });


});
