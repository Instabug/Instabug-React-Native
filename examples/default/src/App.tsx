import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
  NetworkInterceptionMode,
  NetworkLogger,
  ReproStepsMode,
} from 'instabug-reactnative';
import { NativeBaseProvider } from 'native-base';

import { RootTabNavigator } from './navigation/RootTab';
import { nativeBaseTheme } from './theme/nativeBaseTheme';
import { navigationTheme } from './theme/navigationTheme';

// import { QueryClient } from 'react-query';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// import { NativeInstabug } from '../../../src/native/NativeInstabug';
//
// const queryClient = new QueryClient();

//Setting up the handler
const IBGApolloLink = new ApolloLink(NetworkLogger.apolloLinkRequestHandler);

//Sample code
const httpLink = new HttpLink({ uri: 'https://countries.trevorblades.com/graphql' });
const apolloQueryClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([IBGApolloLink, httpLink]),
});

export const App: React.FC = () => {
  useEffect(() => {
    Instabug.init({
      // token: 'deb1910a7342814af4e4c9210c786f35',
      token: '0fcc87b8bf731164828cc411eccc802a',
      invocationEvents: [InvocationEvent.floatingButton],
      debugLogsLevel: LogLevel.verbose,
      networkInterceptionMode: NetworkInterceptionMode.native,
    });
    CrashReporting.setNDKCrashesEnabled(true);

    // NetworkLogger.setNetworkDataObfuscationHandler(async (networkData) => {
    //   networkData.url = `${networkData.url}/RN/obfuscated`;
    //   return networkData;
    // });

    // NetworkLogger.setRequestFilterExpression('true');

    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        {/*<QueryClientProvider client={queryClient}>*/}
        <ApolloProvider client={apolloQueryClient}>
          <NavigationContainer onStateChange={Instabug.onStateChange} theme={navigationTheme}>
            <RootTabNavigator />
          </NavigationContainer>
        </ApolloProvider>
        {/*</QueryClientProvider>*/}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
