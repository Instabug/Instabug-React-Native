import Clipboard from '@react-native-community/clipboard';
import { Image, StyleProp, TextStyle, TouchableHighlight } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface PasteFromClipboardButtonProps extends PropsWithChildren {
  onPress?: (text: string) => void;
  style?: StyleProp<TextStyle> | undefined;
}

const PasteFromClipboardButton: React.FC<PasteFromClipboardButtonProps> = ({ onPress, style }) => {
  const handlePress = async () => {
    const text = await Clipboard.getString();
    onPress?.call(undefined, text); // Using call to pass the text to the callback
  };

  return (
    <TouchableHighlight onPress={handlePress} style={[{ flexDirection: 'row', flex: 1 }, style]}>
      <Image
        source={{
          uri: 'https://w7.pngwing.com/pngs/232/288/png-transparent-computer-icons-symbol-cut-copy-and-paste-symbol-miscellaneous-text-multiple.png',
          width: 15,
          height: 15,
        }}
      />
    </TouchableHighlight>
  );
};

export default PasteFromClipboardButton;
