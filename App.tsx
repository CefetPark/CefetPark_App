import { rootStore, StoreProvider } from '@features/app';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { customTheme } from './nativeBaseTheme';
import { Navigation } from './src/features/navigation';

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
