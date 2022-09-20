import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

function ColorButton({ color, onPress }) {
  return (
    <TouchableOpacity
      accessibilityLabel={`Change primary color to ${color}`}
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => onPress(color)}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginHorizontal: 10,
  },
});

export default ColorButton;
