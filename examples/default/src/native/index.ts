import { NativeModules } from 'react-native';

interface ExampleModule {
  sendNDKCrash(): void;
}

export const NativeExampleModule: ExampleModule = NativeModules.InstabugExampleModule;
