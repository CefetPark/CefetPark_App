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
        h={'8%'}
        onPress={() => handleSubmit()}
        variant={'solid'}
        backgroundColor={'primary'}
        _text={{ color: 'secondary', fontSize: 'md' }}
      >
        <Text fontSize={'lg'} color={'textDark'}>
          Enviar
        </Text>
      </Button>
    </VStack>
  );
};
