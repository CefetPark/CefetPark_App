import { observer } from 'mobx-react-lite';
import { View } from 'native-base';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '@features/app/use-store';

const QrCodeScreen = () => {
  const { authStore } = useStore();
  const qrCodeData = authStore.user?.aspNetUsersId;
  const { height } = Dimensions.get('window');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <QRCode value={qrCodeData} size={height * 0.45} color="black" backgroundColor="white" />
      </View>
    </SafeAreaView>
  );
};

export default observer(QrCodeScreen);
