import ParkingLotForm from '@features/parking-lot/parking-lot-form';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ParkingForm = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
      <KeyboardAvoidingView behavior="height">
        <ParkingLotForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ParkingForm;
