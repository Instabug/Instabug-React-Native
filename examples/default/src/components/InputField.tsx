import React, { forwardRef } from 'react';

import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native';

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  selectTextOnFocus?: boolean | undefined;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(({ style, ...restProps }, ref) => {
  return <TextInput ref={ref} style={[styles.textInput, style]} {...restProps} />;
});

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    borderRadius: 5,
  },
});
