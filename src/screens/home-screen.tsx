import React from 'react';
import ParkingLotList from '@features/parking-lot/parking-lot-list';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from 'native-base';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Box h={'2/5'}>
        <ParkingLotList />
      </Box>
    </SafeAreaView>
  );
};

export default observer(Home);
