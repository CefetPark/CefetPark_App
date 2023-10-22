import useStore from '@features/app/use-store';
import { Box } from 'native-base';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export const Maps = () => {
  const { parkingLotStore } = useStore();
  return (
    <Box
      overflow="hidden"
      borderRadius={12}
      flex={1}
      backgroundColor={'white'}
      shadow={9}
      borderWidth={1}
      borderColor={'#CCC'}
    >
      {parkingLotStore.currentParkingLot && <MapView
        minZoomLevel={12}
        initialRegion={{
          latitude: parseFloat(parkingLotStore.currentParkingLot?.address?.latitude),
          longitude: parseFloat(parkingLotStore.currentParkingLot?.address?.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          flex: 1,
          borderRadius: 12,
        }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: parseFloat(parkingLotStore.currentParkingLot?.address?.latitude),
            longitude: parseFloat(parkingLotStore.currentParkingLot?.address?.longitude),
          }}
          title={parkingLotStore.currentParkingLot?.name}
        />
      </MapView>}
    </Box>
  );
};
