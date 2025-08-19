import React, { forwardRef } from 'react';

import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
  View,
} from 'react-native';
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
  testID?: string;
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
      testID,
      ...restProps
    },
    ref,
  ) => {
    return (
      <View>
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          style={[styles.textInput, style]}
          maxLength={maxLength}
          accessible={true}
          accessibilityLabel={accessibilityLabel ?? testID}
          keyboardType={keyboardType}
          value={value}
          testID={testID}
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
    paddingHorizontal: 16,
    fontSize: 12,
    borderRadius: 5,
    color: 'black',
  },
  errorText: {
    color: '#ff0000',
  },
});
