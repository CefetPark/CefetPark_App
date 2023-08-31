import useStore from '@features/app/use-store';
import { Button, FormControl, Input, Spinner, VStack, useToast } from 'native-base';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export interface LoginFormData {
  login: string;
  senha: string;
}

export const LoginForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { authStore } = useStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      senha: '',
    },
  });

  const hadleError = (errorMessage: string) => {
    toast.show({
      description: errorMessage,
      bgColor: 'danger',
      placement: 'top',
    });
  };

  const onSubmit = (data: LoginFormData) => {
    setLoading(true);
    authStore
      .login(data)
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
              <Input
                h={'16'}
                size={'lg'}
                rounded={12}
                id="cpf"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={11}
                autoCapitalize="none"
                placeholder="Digite o seu cpf"
                keyboardType="number-pad"
              />
            </>
          )}
          name="login"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <FormControl.Label htmlFor="senha">Senha</FormControl.Label>
              <Input
                h={'16'}
                size={'lg'}
                rounded={12}
                id="password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="Digite sua senha"
              />
            </>
          )}
          name="senha"
        />
      </VStack>

      <Button
        rounded={12}
        h={'16%'}
        onPress={handleSubmit(onSubmit)}
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
