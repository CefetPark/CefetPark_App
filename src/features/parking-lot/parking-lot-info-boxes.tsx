import useStore from '@features/app/use-store';
import { observer } from 'mobx-react-lite';
import { Box, HStack, Progress, Text, VStack } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParkingInfoList = () => {
  const { parkingLotStore } = useStore();
  const occupiedSpots =
    parkingLotStore.currentParkingLot?.totalParkingSpots -
    parkingLotStore.currentParkingLot?.freeSpots;
  const occupiedPercentage =
    (occupiedSpots / parkingLotStore.currentParkingLot?.totalParkingSpots) * 100;
  const progressColor =
    occupiedPercentage < 40 ? 'success' : occupiedPercentage < 80 ? 'warning' : 'danger';
  return (
    <VStack space={4} alignItems="center">
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Box
          w="48%"
          h="48"
          bg="green.400"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <VStack justifyContent={'center'} alignItems={'center'}>
            <Icon size={70} name="alpha-p-box" />
            <Text fontWeight={'bold'} fontSize={15}>
              Vagas disponíveis:
            </Text>
            <Text fontWeight={700} fontSize={40}>
              {parkingLotStore.currentParkingLot?.freeSpots}
            </Text>
          </VStack>
        </Box>
        <Box
          w="48%"
          h="48"
          bg="yellow.300"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <VStack justifyContent={'center'} alignItems={'center'}>
            <Icon size={70} name="car-multiple" />
            <Text fontWeight={'bold'} fontSize={15}>
              Vagas ocupadas:
            </Text>
            <Text fontWeight={700} fontSize={40}>
              {occupiedSpots}
            </Text>
          </VStack>
        </Box>
      </HStack>
      <Box
        w="100%"
        h="20"
        bg="primary"
        rounded="md"
        shadow={3}
        justifyContent={'center'}
        paddingX={10}
      >
        <VStack space={2} alignItems={'center'}>
          <Text fontSize={20} fontWeight={500} color={'white'}>
            Lotação
          </Text>
          <Progress value={occupiedPercentage} _filledTrack={{ bg: progressColor }} w={'100%'} />
        </VStack>
      </Box>
    </VStack>
  );
};

export default observer(ParkingInfoList);
