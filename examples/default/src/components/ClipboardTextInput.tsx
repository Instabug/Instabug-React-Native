import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import PasteFromClipboardButton from './PasteFromClipboardButton';
import { HStack } from 'native-base';
import { InputField } from './InputField';

interface ClipboardTextInputProps extends PropsWithChildren {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  selectTextOnFocus?: boolean;
  style?: StyleProp<TextStyle>;
}

export const ClipboardTextInput: React.FC<ClipboardTextInputProps> = ({
  onChangeText,
  style,
  ...restProps
}) => {
  return (
    <HStack alignItems="center" space="xs">
      <InputField onChangeText={onChangeText} style={[styles.inputField, style]} {...restProps} />
      <PasteFromClipboardButton onPress={handleClipboardPress} />
    </HStack>
  );

  function handleClipboardPress(text: string) {
    onChangeText?.call(undefined, text);
  }
};

export const styles = StyleSheet.create({
  inputField: {
    flex: 1,
  },
});
