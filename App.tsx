import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/features/navigation/index';

import { customTheme } from './nativeBaseTheme';
import { StoreProvider, rootStore } from '@features/app';
import QrCodeHandle from '@features/parking-lot/qr-code-handle';

export default function App() {
  return (
    <StoreProvider {...rootStore}>
      <NativeBaseProvider theme={customTheme}>
        <SafeAreaProvider>
          <Navigation />
          {/* <QrCodeHandle /> */}
        </SafeAreaProvider>
      </NativeBaseProvider>
    </StoreProvider>
  );
}
