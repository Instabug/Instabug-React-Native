import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Button({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

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
