import ParkingLotList from '@features/parking-lot/parking-lot-list';
import { observer } from 'mobx-react-lite';
import React from 'react';

const Home = () => {
  return (
    <ParkingLotList />
  );
};

export default observer(Home);
