import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function Screen({ children }) {
  return (
    <View testID="welcome" style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Welcome to Instabug!</Text>
        <Text style={styles.details}>
          Hello Instabug's awesome user! The purpose of this application is to show you the
          different options for customizing the SDK and how easy it is to integrate it to your
          existing app
        </Text>

        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 25,
  },
  contentContainer: {
    padding: 10,
  },
});

export default Screen;
