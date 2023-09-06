import { Image } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ForgotPasswordForm } from '../features/auth/forgot.password.form';

const ForgotPassword = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50, padding: 20, alignItems: 'center' }}>
      <View>
        <Image
          resizeMode="contain"
          source={require('@assets/logo.png')}
          alt="Alternate Text"
          h={'56'}
        />
      </View>
      <ForgotPasswordForm />
    </SafeAreaView>
  );
};

export default ForgotPassword;
