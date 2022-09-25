import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function Screen({ children }) {
  return (
    <View testID="welcome" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    padding: 10,
  },
});

export default Screen;
