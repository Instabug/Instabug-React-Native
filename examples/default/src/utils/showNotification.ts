import { ToastAndroid, Platform, Alert } from 'react-native';

export function showNotification(title: string, message: string): void {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(title, message);
  }
}
