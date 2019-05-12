/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules } from 'react-native';
import '../jest/mockReplies';
import sinon from 'sinon';
import Replies from '../modules/Replies';

describe('Replies Module', () => {
  
  const setRepliesEnabled = sinon.spy(NativeModules.Instabug, 'setRepliesEnabled');
  const hasChats = sinon.spy(NativeModules.Instabug, 'hasChats');
  const showReplies = sinon.spy(NativeModules.Instabug, 'showReplies');
  const setOnNewReplyReceivedCallback = sinon.spy(NativeModules.Instabug, 'setOnNewReplyReceivedCallback');
  const getUnreadMessagesCount = sinon.spy(NativeModules.Instabug, 'getUnreadMessagesCount');
  const setChatNotificationEnabled = sinon.spy(NativeModules.Instabug, 'setChatNotificationEnabled');
  const setEnableInAppNotificationSound = sinon.spy(NativeModules.Instabug, 'setEnableInAppNotificationSound');

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



});
