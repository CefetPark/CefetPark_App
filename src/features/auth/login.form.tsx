import useStore from '@features/app/use-store';
import { Button, FormControl, Input, Spinner, VStack, useToast } from 'native-base';
import React, { useState } from 'react';

export interface LoginFormData {
  login: string;
  senha: string;
}

export const LoginForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState<LoginFormData>({ login: '', senha: '' });
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
    <VStack space={10} w={'100%'}>
      <VStack space={4}>
        <>
          <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
          <Input
            h={'16'}
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
        </>
        <>
          <FormControl.Label htmlFor="senha">Senha</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            rounded={12}
            id="password"
            onChangeText={(password) => {
              setFormData({ ...formData, senha: password });
            }}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Digite sua senha"
          />
        </>
      </VStack>

      <Button
        rounded={12}
        h={'16%'}
        onPress={() => handleSubmit()}
        variant={'solid'}
        backgroundColor={'primary'}
        _text={{ color: 'secondary', fontSize: 'md' }}
        isLoading={loading}
      >
        {loading ? <Spinner size="sm" color="secondary" /> : 'Entrar'}
      </Button>
    </VStack>
  );
};
