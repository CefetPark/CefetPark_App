import packageJson from '@base/package.json';
import useStore from '@features/app/use-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { observer } from 'mobx-react-lite';
import { Button, Image, Tooltip, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoginForm, LoginFormData } from '../features/auth/login.form';

const Login = () => {
  const { authStore } = useStore()
  const navigation = useNavigation();
  const appVersion = packageJson.version
  const [tooltipState, setTooltipState] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      if (!(await authStore.getAsyncStorage('isBiometricSupported'))) {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        await authStore.setAsyncStorage('isBiometricSupported', String(compatible)).then(() => {
          authStore.setBiometricSupport(compatible)
        })
      }
    })()
  }, [])

  useEffect(() => {
    if (tooltipState) {
      setTimeout(() => { setTooltipState(false) }, 2000)
    }
  }, [tooltipState])

  const isAutenticated = async () => {
    if (authStore.keepLoggedIn) {
      await authStore.getAsyncStorage('login').then((value) => {
        if (value) {
          authStore.setIsAutenticated(true)
          onAuthenticate(JSON.parse(value))
        }
      });
    }
  }

  const onAuthenticate = async (loginData: LoginFormData) => {
    await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticação',
      fallbackLabel: 'Biometria não reconhecida'
    }).then(result => {
      if (result.success) authStore.login(loginData)
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ height: '80%', width: '90%', alignSelf: 'center' }} behavior='position'>
        <View w={'100%'} height={'100%'} alignItems={'center'}>
          <Image
            height={'30%'}
            resizeMode="contain"
            source={require('@assets/logo.png')}
            alt="Alternate Text"
          />
          <LoginForm isAutenticated={isAutenticated} />
        </View>
      </KeyboardAvoidingView>
      <View flex={1} justifyContent={'space-between'} alignItems={'center'}>
        <Button
          alignSelf={'center'}
          onPress={() => navigation.navigate('ForgotPassword' as never)}
          _text={{ color: 'primary', fontSize: 'md' }}
        >
          Esqueci minha senha
        </Button>
        <Tooltip label={appVersion} placement={'top'} isOpen={tooltipState}>
          <Button
            alignSelf={'center'}
            fontSize={'sm'}
            _text={{ color: 'textLigth' }}
            onPress={() => { !tooltipState && setTooltipState(true) }}
          >
            Made with &#10084; by M3
          </Button>
        </Tooltip>
      </View>
    </SafeAreaView>
  );
};

export default observer(Login);
