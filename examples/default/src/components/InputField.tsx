import React, { forwardRef } from 'react';

import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ placeholder, value, onChangeText, keyboardType, ...restProps }, ref) => {
    return (
      <TextInput
        ref={ref}
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        {...restProps}
      />
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    borderRadius: 5,
  },
});
