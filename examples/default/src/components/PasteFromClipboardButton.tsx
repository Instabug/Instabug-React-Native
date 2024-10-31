import Clipboard from '@react-native-clipboard/clipboard';
import { StyleProp, TextStyle, TouchableHighlight } from 'react-native';
import React, { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface PasteFromClipboardButtonProps extends PropsWithChildren {
  onPress?: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

const PasteFromClipboardButton: React.FC<PasteFromClipboardButtonProps> = ({ onPress, style }) => {
  const handlePress = async () => {
    const text = await Clipboard.getString();
    onPress?.call(undefined, text); // Using call to pass the text to the callback
  };

  return (
    <TouchableHighlight onPress={handlePress} style={style}>
      <Icon name="copy-outline" />
    </TouchableHighlight>
  );
};

export default PasteFromClipboardButton;
