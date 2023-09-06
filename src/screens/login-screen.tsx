import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Button, Image, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginForm } from '../features/auth/login.form';

const Login = () => {
  const navigation = useNavigation();
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

      <LoginForm />

      <Button
        alignSelf={'center'}
        margin={'10%'}
        onPress={() => navigation.navigate('ForgotPassword' as never)}
        _text={{ color: 'primary', fontSize: 'md' }}
      >
        Esqueci minha senha
      </Button>
      <Text
        alignSelf={'center'}
        position={'absolute'}
        bottom={0}
        color={'textLigth'}
        style={{ marginBottom: 10 }}
      >
        Made with &#10084; by M3
      </Text>
    </SafeAreaView>
  );
};

export default observer(Login);
