import GradientBtn from '@features/ui/gradient-btn';
import { Button, FormControl, Input, Spinner, Text, VStack, View } from 'native-base';
import React, { useState } from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface ForgotFormData {
  cpf: string;
}

export const ForgotPasswordForm = () => {
  const [dataForm, setDataForm] = useState<ForgotFormData>({ cpf: '' });

  const handleSubmit = () => {
    console.log(dataForm);
  };

  return (
    <VStack space={2} w={'100%'}>
      <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
      <Input
        h={responsiveHeight(8)}
        w={'100%'}
        size={'lg'}
        onChangeText={(text) => setDataForm({ cpf: text })}
        maxLength={11}
        rounded={12}
        id="cpf"
        autoCorrect={false}
        placeholder="Digite o seu cpf"
      />
      <View mt={'5%'}>
        <GradientBtn
          callback={handleSubmit}
          height={responsiveHeight(7)}
          radius={12}
          color='secondary'
          fontSize='md'
          component={<Spinner size="sm" color="secondary" />}
          text={'Enviar'}
          fColor='#002c58'
          sColor='#004d99'
        />
      </View>
    </VStack >
  );
};
