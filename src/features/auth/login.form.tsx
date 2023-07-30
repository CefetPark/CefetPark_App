import useStore from '@features/app/use-store';
import { Button, FormControl, Input, VStack } from 'native-base';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

export interface LoginFormData {
  cpf: string;
  password: string;
}

export const LoginForm = () => {
  const { authStore } = useStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cpf: '',
      password: '',
    },
  });
  const onSubmit = (data: LoginFormData) => {
    authStore.setToken();
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
          name="cpf"
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
          name="password"
        />
      </VStack>

      <Button
        rounded={12}
        h={'16%'}
        onPress={handleSubmit(onSubmit)}
        variant={'solid'}
        backgroundColor={'primary'}
        _text={{ color: 'secondary', fontSize: 'md' }}
      >
        Entrar
      </Button>
    </VStack>
  );
};
