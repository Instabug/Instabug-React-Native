import React from 'react';

import { Screen } from '../../components/Screen';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

/**
 *  don't forgot to add Google API key to
 *  examples/default/android/app/src/main/res/values/strings.xml
 *  examples/default/ios/InstabugExample/AppDelegate.mm
 *
 * **/

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
});
export const GoogleMapsScreen: React.FC = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    </Screen>
  );
};
