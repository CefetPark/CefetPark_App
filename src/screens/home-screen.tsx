import ParkingLotList from '@features/parking-lot/parking-lot-list';
import { observer } from 'mobx-react-lite';
import { Box } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
