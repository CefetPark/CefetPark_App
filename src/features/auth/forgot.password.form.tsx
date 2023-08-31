import { Button, FormControl, Input, Text, VStack } from 'native-base';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ForgotFormData {
  cpf: string;
}

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>();
  const onSubmit: SubmitHandler<ForgotFormData> = (event) => {};
  const submit = handleSubmit(onSubmit);

  return (
    <VStack space={10} w={'100%'} h={'100%'}>
      <VStack>
        <FormControl>
          <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            {...register('cpf', { required: true })}
            rounded={12}
            id="cpf"
            autoCorrect={false}
            placeholder="Digite o seu cpf"
          />
        </FormControl>
      </VStack>

      <Button
        rounded={12}
        h={12}
        variant={'solid'}
        backgroundColor={'primary'}
        onPress={() => submit()}
        size={'lg'}
      >
        <Text fontSize={'lg'} color={'textDark'}>
          Entrar
        </Text>
      </Button>
    </VStack>
  );
};
