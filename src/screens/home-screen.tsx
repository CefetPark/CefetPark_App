import ParkingLotList from '@features/parking-lot/parking-lot-list';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParkingLotList />
    </SafeAreaView>
  );
};

export default observer(Home);
