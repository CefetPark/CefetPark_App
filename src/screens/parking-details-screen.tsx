import React from 'react';
import { Maps } from '@features/parking-lot/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, VStack } from 'native-base';
import ParkingInfoList from '@features/parking-lot/parking-lot-info-boxes';
import { Chart } from '@features/parking-lot/parking-lot-chart';

export const ParkingDetails = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} space={5} justifyContent={'center'}>
        <Box h={'25%'} paddingX={2} onTouchStart={() => console.log(123)} rounded={10}>
          <Maps />
        </Box>
        <Box paddingX={2}>
          <ParkingInfoList />
        </Box>
        <Box paddingX={2} alignContent={'center'} justifyContent={'center'}>
          <Chart />
        </Box>
      </VStack>
    </SafeAreaView>
  );
};
