import useStore from '@features/app/use-store';
import { observer } from 'mobx-react-lite';
import { View } from 'native-base';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

const QrCodeScreen = () => {
  const { authStore } = useStore();
  const qrCodeData = authStore.user?.aspNetUsersId;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <QRCode value={qrCodeData} size={responsiveWidth(95)} color="black" backgroundColor="white" />
      </View>
    </SafeAreaView>
  );
};

export default observer(QrCodeScreen);
