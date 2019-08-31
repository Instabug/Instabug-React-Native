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
  
  const setChatsEnabled = sinon.spy(NativeModules.IBGChats, 'setEnabled');
  const showChats = sinon.spy(NativeModules.IBGChats, 'show');

  it('should call the native method setChatsEnabled', () => {

    Chats.setEnabled(true);

    expect(setChatsEnabled.calledOnceWithExactly(true)).toBe(true);

  });

  it('should call the native method showChats', () => {

    Chats.show();

    expect(showChats.calledOnce).toBe(true);

  });

});
