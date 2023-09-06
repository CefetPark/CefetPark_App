import ParkingLotForm from '@features/parking-lot/parking-lot-form';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ParkingForm = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
      <ParkingLotForm />
    </SafeAreaView>
  );
};

export default ParkingForm;
