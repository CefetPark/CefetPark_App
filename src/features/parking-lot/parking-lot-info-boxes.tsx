import { Box, HStack, Progress, Text, VStack } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParkingInfoList = () => {
  return (
    <VStack space={4} alignItems="center">
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Box
          w="48%"
          h="48"
          bg="blue.200"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <VStack justifyContent={'center'} alignItems={'center'}>
            <Icon size={70} name="car" />
            <Text fontWeight={'bold'} fontSize={15}>
              Vagas disponíveis:
            </Text>
            <Text fontWeight={700} fontSize={40}>
              20
            </Text>
          </VStack>
        </Box>
        <Box
          w="48%"
          h="48"
          bg="lightBlue.200"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <VStack justifyContent={'center'} alignItems={'center'}>
            <Icon size={70} name="car" />
            <Text fontWeight={'bold'} fontSize={15}>
              Vagas ocupadas:
            </Text>
            <Text fontWeight={700} fontSize={40}>
              3
            </Text>
          </VStack>
        </Box>
      </HStack>
      <Box
        w="100%"
        h="20"
        bg="blue.500"
        rounded="md"
        shadow={3}
        justifyContent={'center'}
        paddingX={10}
      >
        <VStack space={2} alignItems={'center'}>
          <Text fontSize={20} fontWeight={500}>
            Lotação
          </Text>
          <Progress value={15} _filledTrack={{ bg: 'green.400' }} w={'100%'} />
        </VStack>
      </Box>
    </VStack>
  );
};

export default ParkingInfoList;
