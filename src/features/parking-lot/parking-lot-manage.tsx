import React, { useState } from 'react';
import { Box, HStack, Pressable, Text, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ManageInsertModal from './manage-insert-modal';
import QrCodeHandle from './qr-code-handle';

const ParkingManage = () => {
  const [openedQuestion, setOpenedQuestion] = useState(false);
  const [openedQrCode, setOpenedQrCode] = useState(false);
  const navigation = useNavigation();
  return (
    <VStack space={4} alignItems="center">
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Box
          w="48%"
          h="48"
          bg="blue.400"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Pressable onPress={() => navigation.navigate('ParkingForm' as never)}>
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
          bg="blue.200"
          rounded="md"
          shadow={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Pressable
            onPress={() => {
              setOpenedQuestion(true);
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
      <ManageInsertModal
        opened={openedQuestion}
        setOpened={setOpenedQuestion}
        setOpenedQrCode={setOpenedQrCode}
      />
      <QrCodeHandle opened={openedQrCode} setOpened={setOpenedQrCode} />
    </VStack>
  );
};

export default ParkingManage;
