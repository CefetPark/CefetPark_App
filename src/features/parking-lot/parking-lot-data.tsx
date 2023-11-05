import useStore from '@features/app/use-store';
import { observer } from 'mobx-react-lite';
import { CircleIcon, HStack, Text, useTheme, VStack } from 'native-base';
import React, { memo } from 'react';
import { useWindowDimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const ParkingInfoList = () => {
  const { parkingLotStore } = useStore();
  const { colors } = useTheme()
  const windowWidth = useWindowDimensions().width;

  const occupiedSpots =
    parkingLotStore.currentParkingLot?.totalParkingSpots -
    parkingLotStore.currentParkingLot?.freeSpots;
  const occupiedPercentage =
    (occupiedSpots / parkingLotStore.currentParkingLot?.totalParkingSpots) * 100;
  const progressColor =
    occupiedPercentage < 40 ? 'success' : occupiedPercentage < 80 ? 'warning' : 'danger';

  const radius = (windowWidth * (windowWidth > 400 ? 0.32 : 0.23))
  return (
    <VStack space={4} alignItems="center" justifyContent={'flex-end'} paddingBottom={'3%'} w={'100%'} height={'50%'}>
      <CircularProgress
        value={occupiedPercentage}
        radius={radius}
        duration={1000}
        maxValue={100}
        valueSuffix={'%'}
        activeStrokeColor={String(colors[progressColor])}
        titleStyle={{ fontWeight: 'bold' }}
        activeStrokeWidth={17}
      />
      <HStack w={'95%'} justifyContent={'space-between'}>
        <HStack space={'5%'}>
          <CircleIcon
            mt="0.5"
          />
          <Text fontSize={responsiveFontSize(2)} fontWeight={'600'}>{`${parkingLotStore.currentParkingLot?.freeSpots} Vagas Livres`}</Text>
        </HStack>
        <HStack space={'5%'}>
          <CircleIcon
            mt="0.5"
            color={colors[progressColor]}
          />
          <Text fontSize={responsiveFontSize(2)} fontWeight={'600'}>{`${occupiedSpots} Vagas Ocupadas`}</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default memo(observer(ParkingInfoList));