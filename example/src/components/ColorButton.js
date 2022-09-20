import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ColorButton({ color, checked = false, onPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={`Change primary color to ${color}`}
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => onPress(color)}>
      {checked && <Icon name="checkmark-sharp" color="white" size={30} accessible={false} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColorButton;
