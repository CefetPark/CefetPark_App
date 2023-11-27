import { MaterialIcons } from '@expo/vector-icons';
import useStore from '@features/app/use-store';
import GradientBtn from '@features/ui/gradient-btn';
import { FormControl, HStack, Icon, Input, Spinner, Switch, Text, useToast, View, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export interface LoginFormData {
  login: string;
  senha: string;
}

export const LoginForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState<LoginFormData>({ login: '', senha: '' });
  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);
  const { authStore } = useStore();

  const hadleError = (errorMessage: string) => {
    toast.show({
      title: 'Algo deu errado!',
      description: errorMessage,
      variant: 'subtle',
      bgColor: 'danger',
      placement: 'top',
    });
  };

  const handleSubmit = () => {
    Keyboard.dismiss()
    setLoading(true);
    authStore
      .login(formData)
      .then((response) => {
        if (response.error) {
          hadleError(response.error.errorMessage);
        }
      })
      .catch((error) => hadleError(error.msg))
      .finally(() => setLoading(false));
  };

  return (
    <VStack space={4} h={'100%'} w={'100%'}>
      <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
      <Input
        h={responsiveHeight(8)}
        size={'lg'}
        rounded={12}
        id="cpf"
        onChangeText={(cpf) => {
          setFormData({ ...formData, login: cpf });
        }}
        maxLength={11}
        autoCapitalize="none"
        placeholder="Digite o seu cpf"
        keyboardType="number-pad"
      />
      <FormControl.Label htmlFor="senha">Senha</FormControl.Label>
      <Input
        h={responsiveHeight(8)}
        size={'lg'}
        rounded={12}
        id="password"
        onChangeText={(password) => {
          setFormData({ ...formData, senha: password });
        }}
        maxLength={20}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={25} mr="3" />
          </Pressable>
        }
        type={show ? "text" : "password"}
        autoCapitalize="none"
        placeholder="Digite sua senha"
      />

      <View mt={'5%'}>
        <GradientBtn
          condition={loading}
          callback={handleSubmit}
          height={responsiveHeight(7)}
          radius={12}
          color='secondary'
          fontSize='md'
          component={<Spinner size="sm" color="secondary" />}
          text={'Entrar'}
          fColor='#002c58'
          sColor='#004d99'
        />
      </View>

    </VStack>
  );
};