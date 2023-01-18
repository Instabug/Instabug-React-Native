import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const Button: React.FC<TouchableOpacityProps> = ({ children, ...props }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1D82DC',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
