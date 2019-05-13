/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import { NativeModules } from 'react-native';
import '../jest/mockChats';
import Chats from '../modules/Chats'
import sinon from 'sinon';

describe('Testing Chats Module', () => {
  
  const setChatsEnabled = sinon.spy(NativeModules.Instabug, 'setChatsEnabled');
  const showChats = sinon.spy(NativeModules.Instabug, 'showChats');

  it('should call the native method setChatsEnabled', () => {

    Chats.setEnabled(true);

    expect(setChatsEnabled.calledOnce).toBe(true);
    expect(setChatsEnabled.calledWith(true)).toBe(true);

  });

  it('should call the native method showChats', () => {

    Chats.show();

    expect(showChats.calledOnce).toBe(true);

  });

});
