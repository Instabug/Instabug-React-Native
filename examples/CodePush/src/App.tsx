import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
} from 'instabug-reactnative';
import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';

const App = () => {
  useEffect(() => {
    codePush.getUpdateMetadata().then(update => {
      Instabug.init({
        token: 'deb1910a7342814af4e4c9210c786f35',
        invocationEvents: [InvocationEvent.floatingButton],
        debugLogsLevel: LogLevel.verbose,
        codePushLabel: update?.label,
      });
    });
  }, []);

  const checkUpdates = () => {
    codePush.sync({
      updateDialog: {
        title: 'release successful',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };

  const reportCrash = () => {
    try {
      throw new Error('Handled Exception From Instabug Test App');
    } catch (err) {
      if (err instanceof Error) {
        CrashReporting.reportError(err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.heading}>Instabug + CodePush</Text>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={reportCrash}>
            <Text style={styles.text}>THROW HANDLED ERROR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={checkUpdates}>
            <Text style={styles.text}>Check for updates</Text>
          </TouchableOpacity>
          <Text>Release Version: </Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    padding: 10,
  },
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

export default codePush(App);
