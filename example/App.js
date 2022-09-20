import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Instabug from 'instabug-reactnative';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    Instabug.start('2c63627b9923e10eee2c8abf92e6925f', [Instabug.invocationEvent.floatingButton]);
  }, []);

  return (
    <NavigationContainer onStateChange={Instabug.onStateChange}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: props => {
            let name = route.name.toLowerCase();
            if (!props.focused) name += '-outline';
            return <Icon {...props} name={name} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
