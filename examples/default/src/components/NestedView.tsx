import React from 'react';

import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

interface NestedViewProps {
  children?: React.ReactNode;
  depth: number;
  breadth?: number;
}

export const NestedView: React.FC<NestedViewProps> = ({ depth, breadth = 1, children }) => {
  if (!depth) {
    return <>{children}</>;
  }
  return (
    <View style={styles.container}>
      <Text>{depth}</Text>
      {new Array(breadth).fill(null).map((_, index) => (
        <NestedView key={index} breadth={breadth} depth={depth - 1} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 1,
  },
});
