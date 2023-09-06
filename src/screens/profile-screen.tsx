import { ProfileForm } from '@features/profile';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileForm />
    </SafeAreaView>
  );
};

export default Profile;
