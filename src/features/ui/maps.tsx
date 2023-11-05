import useStore from '@features/app/use-store';
import { observer } from 'mobx-react-lite';
import { Box } from 'native-base';
import React, { memo } from 'react';
import MapView, { Marker } from 'react-native-maps';

const Maps = () => {
  const { parkingLotStore } = useStore();
  return (
    <Box
      overflow="hidden"
      flex={1}
      backgroundColor={'white'}
      shadow={9}
      borderWidth={1}
      borderColor={'#CCC'}
    >
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: +parkingLotStore.currentParkingLot.address.latitude,
          longitude: +parkingLotStore.currentParkingLot.address.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: +parkingLotStore.currentParkingLot.address.latitude,
            longitude: +parkingLotStore.currentParkingLot.address.longitude,
          }}
          title={parkingLotStore.currentParkingLot.name}
        />
      </MapView>
    </Box>
  );
};

export default memo(observer(Maps))
