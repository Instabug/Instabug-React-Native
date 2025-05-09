import { StyleSheet, TouchableOpacity } from 'react-native';
import { CrashReporting, NonFatalErrorLevel } from 'instabug-reactnative';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  function sendCrash(num1, num2) {
    try {
      const error = new Error(`Customized Crash${num1}`);

      throw error;
    } catch (err) {
      if (err instanceof Error) {
        CrashReporting.reportError(err, {
          userAttributes: { attribute_Key: 'attribute_Value' },
          fingerprint: `fingerprint${num2}`,
          level: 'Critical',
        }).then(() => {
          console.log(`Crash report is Sent!`);
        });
      }
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <TouchableOpacity
        onPress={() => {
          // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
          // console.log('Doing something async');
          // await sleep(100);
          // console.log('Something went wrong');
          sendCrash(123123, 4234);
        }}>
        <Text>Press here to produce a crash 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
          // console.log('Doing something async');
          // await sleep(100);
          // console.log('Something went wrong');
          sendCrash('234234', '4234234');
        }}>
        <Text>Press here to produce a crash 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
