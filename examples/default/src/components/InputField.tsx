import React, { PropsWithChildren } from 'react';

import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';

interface InputFieldProps extends PropsWithChildren {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

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
