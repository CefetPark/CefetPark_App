import { Box, Text } from 'native-base';
import React from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Maps = () => {
  return (
    <Box
      overflow="hidden"
      borderRadius={20}
      style={{
        flex: 1,
        borderRadius: 12,
      }}
    >
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          flex: 1,
        }}
      />
    </Box>
  );
};
