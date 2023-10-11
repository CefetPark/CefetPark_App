import useStore from '@features/app/use-store';
import ParkingInfoList from '@features/parking-lot/parking-lot-info-boxes';
import ParkingLotManage from '@features/parking-lot/parking-lot-manage';
import { observer } from 'mobx-react-lite';
import { Box, Center, HStack, Skeleton, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ParkingManage = () => {
  const { parkingLotStore } = useStore();
  const [loading, setLoading] = useState<Boolean>(false)

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
      {loading ?
        <>
          <VStack flex={1} justifyContent={'center'}>
            <Center w="100%" flex={1}>
              <VStack flex={1} w="95%" space={5} overflow="hidden" justifyContent={'center'}>
                <VStack space={5} h={'40%'} justifyContent={'center'}>
                  <HStack h={'65%'} justifyContent={'space-between'}>
                    <Skeleton borderRadius={12} h={'100%'} w={'47%'} />
                    <Skeleton borderRadius={12} h={'100%'} w={'47%'} />
                  </HStack>
                  <Skeleton borderRadius={12} h={'25%'} />
                  <HStack h={'65%'} justifyContent={'space-between'}>
                    <Skeleton borderRadius={12} h={'100%'} w={'47%'} />
                    <Skeleton borderRadius={12} h={'100%'} w={'47%'} />
                  </HStack>
                </VStack>
              </VStack>
            </Center>
          </VStack>
        </>
        :
        <>
          <VStack space={5} height={'100%'} justifyContent={'center'} paddingX={2}>
            <ParkingInfoList />
            <ParkingLotManage />
          </VStack>
        </>
      }
    </SafeAreaView>
  );
};

export default observer(ParkingManage);
