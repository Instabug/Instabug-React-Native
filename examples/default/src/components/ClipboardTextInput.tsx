import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import PasteFromClipboardButton from './PasteFromClipboardButton';

interface ClipboardTextInputProps extends PropsWithChildren {
  placeholder?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  selectTextOnFocus?: boolean | undefined;
  style?: StyleProp<TextStyle> | undefined;
}

export const ClipboardTextInput: React.FC<ClipboardTextInputProps> = ({
  placeholder,
  onChangeText,
  selectTextOnFocus,
  value,
  style,
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        selectTextOnFocus={selectTextOnFocus}
        value={value}
        style={[style ?? styles.textInput, { marginLeft: 8, flex: 10 }]}
      />
      <PasteFromClipboardButton onPress={handleClipboardPress} />
    </View>
  );

  function handleClipboardPress(text: string) {
    onChangeText?.call(undefined, text);
  }
};

const formControlStyles = StyleSheet.create({
  formControl: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    borderRadius: 5,
  },
});

export const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  textInput: StyleSheet.flatten([
    formControlStyles.formControl,
    {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ccc',
    },
  ]),
  clipboardButton: {
    flexDirection: 'row',
    flex: 1,
  },
});
