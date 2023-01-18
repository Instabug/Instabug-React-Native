import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export const Screen: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View testID="welcome" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>{children}</ScrollView>
    </View>
  );
};

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
