import useStore from '@features/app/use-store';
import { Button, FormControl, HStack, Icon, Input, Spinner, Switch, Text, useToast, VStack } from 'native-base';
import React, { useState } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Keyboard } from 'react-native';

export interface LoginFormData {
  login: string;
  senha: string;
}

export const LoginForm = ({ isAutenticated }: any) => {
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
    <VStack space={2} h={'100%'} w={'100%'}>
      <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
      <Input
        onPressIn={isAutenticated}
        h={'10%'}
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
        h={'10%'}
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
      <HStack alignItems="center" space={3}>
        <Switch defaultIsChecked={authStore.keepLoggedIn} onValueChange={() => { authStore.changeKeepLoggedInState() }} size="sm" />
        <Text>Mantenha-me logado</Text>
      </HStack>
      <Button
        rounded={12}
        mt={'5%'}
        h={'10%'}
        onPress={() => handleSubmit()}
        variant={'solid'}
        backgroundColor={'primary'}
        _text={{ color: 'secondary', fontSize: 'sm' }}
        isLoading={loading}
      >
        {loading ? <Spinner size="sm" color="secondary" /> : 'Entrar'}
      </Button>
    </VStack>
  );
};
