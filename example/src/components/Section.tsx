import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
