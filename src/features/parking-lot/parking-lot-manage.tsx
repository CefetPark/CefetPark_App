import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParkingManage = () => {
  const navigation = useNavigation();
  return (
    <VStack space={4} alignItems="center">
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Box
          w="48%"
          h="48"
          bg="danger"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Pressable onPress={() => navigation.navigate('ParkingRemove' as never)}>
            <VStack justifyContent={'center'} alignItems={'center'}>
              <Icon size={70} name="car-arrow-left" />
              <Text fontWeight={'bold'} fontSize={15}>
                Remover veículo
              </Text>
            </VStack>
          </Pressable>
        </Box>
        <Box
          w="48%"
          h="48"
          bg="green.400"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('ParkingForm' as never);
            }}
          >
            <VStack justifyContent={'center'} alignItems={'center'}>
              <Icon size={70} name="car-arrow-right" />
              <Text fontWeight={'bold'} fontSize={15}>
                Inserir veículo
              </Text>
            </VStack>
          </Pressable>
        </Box>
      </HStack>
    </VStack>
  );
};

export default ParkingManage;
