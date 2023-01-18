import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionProps extends PropsWithChildren {
  title: string;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

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
