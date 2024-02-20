import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, TextStyle, Text } from 'react-native';

interface CustomTextProps extends PropsWithChildren {
  style?: StyleProp<TextStyle>;
}

export const CustomText: React.FC<CustomTextProps> = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});
