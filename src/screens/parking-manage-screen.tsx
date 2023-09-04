import ParkingInfoList from '@features/parking-lot/parking-lot-info-boxes';
import ParkingLotManage from '@features/parking-lot/parking-lot-manage';
import { observer } from 'mobx-react-lite';
import { Box, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default observer(ParkingManage);
