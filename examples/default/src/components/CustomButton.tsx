import React, { PropsWithChildren } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Button } from 'native-base';
import { CustomText } from './CustomText';
import { StyleSheet } from 'react-native';

interface CustomButtonProps extends PropsWithChildren {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  title,
  children,
  ...restProps
}) => {
  return (
    <Button style={style} {...restProps}>
      <CustomText style={styles.text}>{title}</CustomText>
      {children}
    </Button>
  );
};

export const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
