import useToast from '@base/src/helpers/use-toast';
import useStore from '@features/app/use-store';
import GradientBtn from '@features/ui/gradient-btn';
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input, Spinner, Text, VStack, View } from 'native-base';
import React, { useState } from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface ForgotFormData {
  cpf: string;
}

export const ForgotPasswordForm = () => {
  const [dataForm, setDataForm] = useState<ForgotFormData>({ cpf: '' });
  const { authStore } = useStore()
  const toast = useToast()
  const navigation = useNavigation()

  const handleSubmit = () => {
    authStore.forgotPassword(dataForm.cpf)
    toast({ bgColor: 'success', description: 'Se houver um e-mail vinculado a esse cpf, uma nova senha será enviada para o seu e-mail.', placement: 'top', variant: 'subtle' })
    navigation.goBack()
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
        inputMode='numeric'
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
