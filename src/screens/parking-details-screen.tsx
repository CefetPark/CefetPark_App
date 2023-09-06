import useStore from '@features/app/use-store';
import { Maps } from '@features/parking-lot/maps';
import { Chart } from '@features/parking-lot/parking-lot-chart';
import ParkingInfoList from '@features/parking-lot/parking-lot-info-boxes';
import { Box, VStack } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ParkingDetails = () => {
  const { parkingLotStore } = useStore();
  const { address } = parkingLotStore.currentParkingLot;
  const zipcodeFormated = `${address.zipCode.slice(0, 5)}-${address.zipCode.slice(5)}`;
  const adressFormated = `${address.name.split(' ').join('+')},+${address.number}+-+${
    address.neighborhood
  },+${address.complement.split(' ').join('+')}+-+RJ,+${zipcodeFormated}`;
  const openGoogleMaps = () => {
    Linking.canOpenURL('comgooglemaps://').then((supported) => {
      if (supported) {
        Linking.openURL(`comgooglemaps://?q=${adressFormated}`);
      } else {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${adressFormated}`);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} space={5} justifyContent={'center'}>
        <Box h={'25%'} paddingX={2} onTouchStart={() => openGoogleMaps()} rounded={10}>
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
