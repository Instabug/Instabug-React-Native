import { DefaultTheme } from '@react-navigation/native';

import { nativeBaseTheme } from './nativeBaseTheme';

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: nativeBaseTheme.colors.primary[600],
  },
};
