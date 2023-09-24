import useStore from '@features/app/use-store';
import { Maps } from '@features/parking-lot/maps';
import { Chart } from '@features/parking-lot/parking-lot-chart';
import ParkingInfoList from '@features/parking-lot/parking-lot-info-boxes';
import { Box, Center, HStack, Skeleton, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ParkingDetails = () => {
  const { parkingLotStore } = useStore();
  const [adressFormated, setAdressFormated] = useState('');
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (parkingLotStore.currentParkingLot) {
      const { address } = parkingLotStore.currentParkingLot;
      const zipcodeFormated = `${address.zipCode?.slice(0, 5)}-${address.zipCode.slice(5)}`;
      const adressFormated = `${address.name?.split(' ').join('+')},+${address.number}+-+${address.neighborhood},+${address.complement?.split(' ').join('+')}+-+RJ,+${zipcodeFormated}`;
      setAdressFormated(adressFormated);
    }
  }, [parkingLotStore.currentParkingLot]);

  useEffect(() => {
    const reload = async () => {
      setLoading(true)
      await parkingLotStore.reloadCurrentParkingLot(parkingLotStore.currentParkingLot.id)
      setLoading(false)
    }
    reload()
  }, [])

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
      {loading ? <Center w="100%" flex={1}>
        <VStack flex={1} w="95%" space={5} overflow="hidden" justifyContent={'center'}>
          <Skeleton borderRadius={12} h={'33%'} />
          <VStack space={5} h={'33%'} justifyContent={'center'}>
            <HStack h={'65%'} justifyContent={'space-between'}>
              <Skeleton borderRadius={12} h={'100%'} w={'47%'} />
              <Skeleton borderRadius={12} h={'100%'} w={'47%'} />
            </HStack>
            <Skeleton borderRadius={12} h={'25%'} />
          </VStack>
          <Skeleton borderRadius={12} h={'33%'} />
        </VStack>
      </Center> : <VStack flex={1} space={5} justifyContent={'center'}>
        <Box h={'25%'} paddingX={2} onTouchStart={() => openGoogleMaps()} rounded={10}>
          <Maps />
        </Box>
        <Box paddingX={2}>
          <ParkingInfoList />
        </Box>
        <Box paddingX={2} alignContent={'center'} justifyContent={'center'}>
          <Chart />
        </Box>
      </VStack>}
    </SafeAreaView>
  );
};
