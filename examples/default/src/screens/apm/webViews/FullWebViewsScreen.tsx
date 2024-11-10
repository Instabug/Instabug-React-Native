import React from 'react';
import { Screen } from '../../../components/Screen';
import { WebView } from 'react-native-webview';

export const FullWebViewsScreen: React.FC = () => {
  return (
    <Screen>
      <WebView
        source={{ uri: 'https://www.instabug.com' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </Screen>
  );
};
