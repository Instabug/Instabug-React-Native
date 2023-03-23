/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
} from 'instabug-reactnative';
import React, {useEffect, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

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

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TouchableOpacity style={styles.button} onPress={reportCrash}>
            <Text style={styles.text}>THROW HANDLED ERROR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={checkUpdates}>
            <Text style={styles.text}>Check for updates</Text>
          </TouchableOpacity>
          <Section title="Release version" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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
