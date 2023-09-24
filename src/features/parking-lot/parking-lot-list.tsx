import useStore from '@features/app/use-store';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import {
  Box,
  CircleIcon,
  Heading,
  HStack,
  Image,
  Pressable,
  Skeleton,
  Spacer,
  Spinner,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { ParkingLotModel } from './parking-lot.model';

const ParkingList = () => {
  const { parkingLotStore } = useStore();
  const navigation = useNavigation();
  const [parkingLots, setParkingLots] = useState<ParkingLotModel[] | null>(null);

  const getColorByOccupancy = (parkingLot: ParkingLotModel) => {
    const percent = Math.floor(
      ((parkingLot.totalParkingSpots - parkingLot.freeSpots) /
        parkingLot.totalParkingSpots) *
      100
    )
    if (percent < 40) {
      return 'success';
    } else if (percent <= 80) {
      return 'warning';
    } else {
      return 'danger';
    }
  };

  useEffect(() => {
    setParkingLots(parkingLotStore.parkingLots);
  }, [parkingLotStore.parkingLots]);

  return (
    <Box flex={1} justifyContent={'center'}>
      {parkingLots ? (
        <Box flex={1} justifyContent={'center'}>
          {parkingLots.map((parkingLot) => (
            <React.Fragment key={parkingLot.id}>
              <Pressable
                onPress={() => {
                  parkingLotStore.setCurrentParkingLot(parkingLot.id)
                  navigation.navigate('ParkingDetails' as never);
                }}
              >
                <HStack
                  flexDir={'row'}
                  justifyContent={'space-evenly'}
                  h={'24'}
                  paddingX={5}
                  alignSelf={'center'}
                  rounded={'md'}
                  backgroundColor={'light.50'}
                  shadow={'5'}
                  mb={'5%'}
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
                      {parkingLot?.name}
                    </Text>
                  </Box>

                  <Box w={'1/5'} justifyContent={'center'} alignItems={'center'}>
                    <CircleIcon
                      size="3"
                      mt="0.5"
                      color={getColorByOccupancy(parkingLot)}
                    />
                  </Box>
                </HStack>
              </Pressable>
            </React.Fragment>
          ))}
        </Box>
      ) : (
        <>
          <React.Fragment>
            <Skeleton
              flexDir={'row'}
              justifyContent={'space-evenly'}
              h={'20'}
              w={'85%'}
              alignSelf={'center'}
              rounded={'md'}
              backgroundColor={'gray.300'}
              shadow={'5'}
            />
            <Spacer />
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading fontSize="md">Carregando...</Heading>
            </HStack>
          </React.Fragment>
        </>
      )}
    </Box>
  );
};

export default observer(ParkingList);
