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
    <VStack space={4} w={'100%'}>
      <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
      <Input
        h={'22%'}
        w={'100%'}
        size={'lg'}
        onChangeText={(text) => setDataForm({ cpf: text })}
        maxLength={11}
        rounded={12}
        id="cpf"
        autoCorrect={false}
        placeholder="Digite o seu cpf"
      />
      <Button
        rounded={12}
        h={'22%'}
        onPress={() => handleSubmit()}
        variant={'solid'}
        backgroundColor={'primary'}
        _text={{ color: 'secondary', fontSize: 'md' }}
      >
        Enviar
      </Button>
    </VStack >
  );
};
