import { Button, FormControl, Input, Text, VStack } from 'native-base';
import React, { useState } from 'react';

interface ForgotFormData {
  cpf: string;
}

export const ForgotPasswordForm = () => {
  const [dataForm, setDataForm] = useState<ForgotFormData>({ cpf: '' });

  const handleSubmit = () => {
    console.log(dataForm);
  };

  return (
    <VStack space={10} w={'100%'} h={'100%'}>
      <VStack>
        <FormControl>
          <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            onChangeText={(text) => setDataForm({ cpf: text })}
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
        onPress={() => handleSubmit()}
        size={'lg'}
      >
        <Text fontSize={'lg'} color={'textDark'}>
          Entrar
        </Text>
      </Button>
    </VStack>
  );
};
