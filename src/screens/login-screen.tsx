import { Button, Image, KeyboardAvoidingView, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackScreenProps } from 'types';

import { LoginForm } from '../features/auth/login.form';
import { observer } from 'mobx-react-lite';
import useStore from '@features/app/use-store';

const Login = ({ navigation }: AuthStackScreenProps<'Login'>) => {
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
        onPress={() => navigation.navigate('ForgotPassword')}
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
