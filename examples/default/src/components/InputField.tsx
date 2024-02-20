import React, { forwardRef } from 'react';

import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, ViewStyle, View } from 'react-native';
import { Text } from 'native-base';

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  selectTextOnFocus?: boolean | undefined;
  errorText?: string;
  maxLength?: number;
  accessibilityLabel?: string;
  flex?: number;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      placeholder,
      value,
      style,
      onChangeText,
      accessibilityLabel,
      maxLength,
      keyboardType,
      errorText,
      ...restProps
    },
    ref,
  ) => {
    return (
      <View>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={[styles.textInput, style]}
          maxLength={maxLength}
          accessibilityLabel={accessibilityLabel}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          {...restProps}
        />
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
      </View>
    );
  },
);

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
  errorText: {
    color: '#ff0000',
  },
});
