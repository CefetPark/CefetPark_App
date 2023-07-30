import { observer } from 'mobx-react-lite';
import { Box, CircleIcon, HStack, Image, Spacer, Text, Pressable } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import React, { useEffect, useState } from 'react';
import useStore from '@features/app/use-store';
import { ParkingLot } from './parking-lot.store';
import { useNavigation } from '@react-navigation/native';

const ParkingList = () => {
  const { parkingLotStore, authStore } = useStore();
  const navigation = useNavigation();
  const navigate = authStore.authToken == 'driver' ? 'ParkingDetails' : 'ParkingManage';

  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

  useEffect(() => {
    setParkingLots(parkingLotStore.getParkingLots());
  }, []);

  return (
    <Box flex={1}>
      {parkingLots.map((parkingLot) => (
        <React.Fragment key={parkingLot.id}>
          <Pressable onPress={() => navigation.navigate('ParkingManage' as never)}>
            <HStack
              flexDir={'row'}
              justifyContent={'space-evenly'}
              h={'20'}
              w={'85%'}
              alignSelf={'center'}
              rounded={'md'}
              backgroundColor={'gray.300'}
              shadow={'5'}
            >
              <Box w={'1/5'} justifyContent={'center'} alignItems={'center'}>
                <Image
                  resizeMode="contain"
                  source={require('@assets/iconParking.png')}
                  size={'sm'}
                  alt="Simbolo de um estacionamento em ingles"
                />
              </Box>
              <Box w={'3/6'} justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={RFValue(15)} textAlign={'justify'}>
                  {parkingLot.name}
                </Text>
              </Box>
              <Box w={'1/5'} justifyContent={'center'} alignItems={'center'}>
                <CircleIcon size="3" mt="0.5" color="emerald.500" />
              </Box>
            </HStack>
          </Pressable>
          <Spacer />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default observer(ParkingList);
