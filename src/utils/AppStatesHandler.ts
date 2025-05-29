import { AppState, type AppStateStatus } from 'react-native';

let subscription: any = null;

// Register the event listener manually
export const addAppStateListener = (handleAppStateChange: (state: AppStateStatus) => void) => {
  if (!subscription) {
    subscription = AppState.addEventListener('change', handleAppStateChange);
  }
};

// Unregister the event listener manually
//todo: find where to Unregister appState listener
export const removeAppStateListener = () => {
  if (subscription) {
    subscription.remove();
    subscription = null;
  }
};
