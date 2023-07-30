import React from 'react';
import { Maps } from '@features/parking-lot/maps';
import ParkingInfoList from '@features/parking-lot/parking-lot-info-boxes';
import { Box, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import ParkingLotManage from '@features/parking-lot/parking-lot-manage';
import QrCodeHandle from '@features/parking-lot/qr-code-handle';

const ParkingManage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} space={5} justifyContent={'center'}>
        <Box paddingX={2}>
          <ParkingInfoList />
        </Box>
        <Box paddingX={2} alignContent={'center'} justifyContent={'center'}>
          <ParkingLotManage />
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

export default ParkingManage;
