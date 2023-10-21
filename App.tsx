import { rootStore, StoreProvider } from '@features/app';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './src/features/navigation';
import { customTheme } from './theme/nativeBaseTheme';

export default function App() {
  return (
    <StoreProvider {...rootStore}>
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
