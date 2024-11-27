import React from 'react';
import { Screen } from '../../../components/Screen';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export const PartialWebViewsScreen: React.FC = () => {
  return (
    <Screen>
      <WebView
        style={styles.webView}
        source={{ uri: 'https://www.instabug.com' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <WebView
        source={{ uri: 'https://www.google.com' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  webView: {
    marginBottom: 20,
  },
});
