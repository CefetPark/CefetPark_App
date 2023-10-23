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
  ScrollView,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ParkingLotModel } from './parking-lot.model';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const ParkingList = () => {
  const { parkingLotStore, authStore } = useStore();
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1}>
        <VStack paddingY={'2%'} borderBottomRadius={12} h={'35%'} alignSelf={'center'} justifyContent={'space-around'} alignItems={'center'} w={'100%'} paddingX={5} backgroundColor={'primary'}>
          <VStack w={'100%'}>
            <Text fontFamily={'body'} fontWeight="600" fontSize={responsiveFontSize(4)} color={'white'}>Olá,</Text>
            <Text fontFamily={'body'} fontWeight="600" fontSize={responsiveFontSize(4)} color={'white'}>{authStore.user?.name} &#128512;</Text>
          </VStack>
          <Text fontFamily={'body'} fontWeight="600" fontSize={responsiveFontSize(4.5)} color={'white'}>Estacionamentos</Text>
        </VStack>
        <ScrollView flex={1} paddingTop={'5%'}>
          <View>
            {parkingLotStore.parkingLots ? (
              <Box flex={1} justifyContent={'center'}>
                {parkingLotStore.parkingLots.map((parkingLot) => (
                  <React.Fragment key={parkingLot.id}>
                    <Pressable
                      onPress={() => {
                        parkingLotStore.setCurrentParkingLot(parkingLot.id)
                        navigation.navigate('ParkingDetails' as never);
                      }}
                      h={responsiveHeight(13)}
                      mb={'5%'}
                    >
                      <HStack
                        flexDir={'row'}
                        justifyContent={'space-evenly'}
                        paddingX={5}
                        alignSelf={'center'}
                        borderRadius={12}
                        backgroundColor={'light.50'}
                        shadow={'5'}
                        h={'100%'}
                      >
                        <Box w={'1/5'} justifyContent={'center'} alignItems={'center'}>
                          <Image
                            resizeMode="contain"
                            source={require('@assets/iconParking.png')}
                            size={'100%'}
                            alt="Simbolo de um estacionamento em ingles"
                          />
                        </Box>
                        <Box w={'3/6'} justifyContent={'center'} alignItems={'center'}>
                          <Text fontSize={responsiveFontSize(2.3)} textAlign={'justify'}>
                            {parkingLot?.name}
                          </Text>
                        </Box>

                        <Box w={'1/5'} justifyContent={'center'} alignItems={'center'}>
                          <CircleIcon
                            size="18%"
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
};

export default observer(ParkingList);
