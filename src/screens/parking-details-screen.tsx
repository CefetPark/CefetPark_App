import useStore from '@features/app/use-store';
import { Chart } from '@features/parking-lot/parking-lot-chart';
import { Maps } from '@features/ui/maps';
import { Avatar, Box, Center, HStack, Image, Pressable, Skeleton, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from '../helpers/use-debounce';
import MapsDialog from '@features/ui/maps-dialog'

export const ParkingDetails = () => {
  const { parkingLotStore } = useStore();
  const { mapsDebounce } = useDebounce()
  const [adressFormated, setAdressFormated] = useState('');
  const [openedMap, setOpenedMap] = useState<boolean>(false)
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading
        ? <Center w="100%" flex={1}>
          <VStack flex={1} w={responsiveWidth(95)} space={5} overflow="hidden" justifyContent={'center'}>
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
        </Center>
        : <VStack flex={1} space={5} justifyContent={'center'}>
          <Pressable h={responsiveHeight(25)} paddingX={2} onPress={() => mapsDebounce(adressFormated, setOpenedMap)} rounded={10}>
            <Maps />
          </Pressable>
          <HStack alignSelf={'center'} w={responsiveWidth(95)} h={responsiveHeight(25)} justifyContent={'space-between'}>
            <VStack
              borderColor={"#CCC"}
              borderWidth={1}
              shadow={3}
              space={'5%'}
              backgroundColor={'white'}
              rounded={12}
              w={responsiveWidth(45)}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Avatar size={responsiveFontSize(10)} source={require('@assets/carro.png')} />
              <Text fontWeight={'500'} fontSize={responsiveFontSize(2)}>Vagas Ocupadas</Text>
              <Text fontSize={responsiveFontSize(3)}>{parkingLotStore.currentParkingLot.totalParkingSpots - parkingLotStore.currentParkingLot.freeSpots}</Text>
            </VStack>
            <VStack
              borderColor={"#CCC"}
              borderWidth={1}
              shadow={3}
              space={'5%'}
              backgroundColor={'white'}
              rounded={12}
              w={responsiveWidth(45)}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Avatar size={responsiveFontSize(10)} source={require('@assets/estacionados.png')} />
              <Text fontWeight={'500'} fontSize={responsiveFontSize(2)}>Vagas livres</Text>
              <Text fontSize={responsiveFontSize(3)}>{parkingLotStore.currentParkingLot.freeSpots}</Text>
            </VStack>
          </HStack>
          <Chart />
        </VStack>}
      <MapsDialog opened={openedMap} setOpened={setOpenedMap} />
    </SafeAreaView>
  );
};
