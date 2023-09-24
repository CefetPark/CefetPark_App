import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Button, Image, Text } from 'native-base';
import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginForm } from '../features/auth/login.form';

const Login = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10, padding: 20, alignItems: 'center' }}>
      <View>
        <Image
          resizeMode="contain"
          source={require('@assets/logo.png')}
          alt="Alternate Text"
          h={'56'}
        />
      </View>

      <LoginForm />

      <Button
        alignSelf={'center'}
        margin={'10%'}
        onPress={() => navigation.navigate('ForgotPassword' as never)}
        _text={{ color: 'primary', fontSize: 'md' }}
      >
        Esqueci minha senha
      </Button>
    </SafeAreaView>
  );
};

export default observer(Login);
