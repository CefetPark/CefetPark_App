import useStore from '@features/app/use-store';
import { Chart } from '@features/parking-lot/parking-lot-chart';
import { Maps } from '@features/ui/maps';
import { Avatar, Box, Center, HStack, Image, Pressable, ScrollView, Skeleton, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking } from 'react-native';
import GradientBtn from '@features/ui/gradient-btn';

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

  const openMaps = () => {
    Linking.canOpenURL('comgooglemaps://').then((supported) => {
      if (supported) {
        Linking.openURL(`comgooglemaps://?q=${adressFormated}`);
      } else {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${adressFormated}`);
      }
    })
  }

  return (
    <>
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
        : <ScrollView flex={1}>
          <VStack flex={1} space={5} justifyContent={'center'} alignContent={'center'}>
            <View h={responsiveHeight(40)}>
              <Maps />
            </View>
            <VStack
              flex={1}
              alignItems={'center'}
              bg={"#f5f5f5"}
              mt={'-15%'}
              borderTopRadius={12}
              pt={'5%'}
              space={5}
              style={{
                elevation: 8,
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
              }}
            >
              <HStack w={'95%'} justifyContent={'space-between'}>
                <GradientBtn
                  iconComponent={<Icon name='google-maps' size={responsiveFontSize(2)} color={'white'} />}
                  callback={openMaps}
                  color='white'
                  height={responsiveHeight(6)}
                  radius={12}
                  fontSize='md'
                  text={'Abrir Maps'}
                  fColor='#002c58'
                  sColor='#004d99' />
              </HStack>
              <HStack
                borderColor={"#CCC"}
                borderWidth={1}
                shadow={3}
                space={'5%'}
                backgroundColor={'white'}
                rounded={12}
                h={responsiveHeight(12)}
                w={responsiveWidth(95)}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                paddingX={'2%'}
                paddingY={'3%'}
              >
                <Avatar size={responsiveFontSize(10)} source={require('@assets/carro.png')} />
                <Text fontWeight={'500'} fontSize={responsiveFontSize(2)}>Vagas Ocupadas</Text>
                <Text color={'danger'} fontWeight={'bold'} fontSize={responsiveFontSize(3)}>{parkingLotStore.currentParkingLot.totalParkingSpots - parkingLotStore.currentParkingLot.freeSpots}</Text>
              </HStack>
              <HStack
                borderColor={"#CCC"}
                borderWidth={1}
                shadow={3}
                space={'5%'}
                backgroundColor={'white'}
                rounded={12}
                h={responsiveHeight(12)}
                w={responsiveWidth(95)}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                paddingX={'2%'}
                paddingY={'3%'}
              >
                <Avatar size={responsiveFontSize(10)} source={require('@assets/estacionados.png')} />
                <Text fontWeight={'500'} fontSize={responsiveFontSize(2)}>Vagas Livres</Text>
                <Text color={'success'} fontWeight={'bold'} fontSize={responsiveFontSize(3)}>{parkingLotStore.currentParkingLot.freeSpots}</Text>
              </HStack>
              <View>
                <Chart />
              </View>
            </VStack>
          </VStack>
        </ScrollView>
      }
    </>
  );
};
