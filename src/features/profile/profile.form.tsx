import React from 'react';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import useStore from '@features/app/use-store';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

export const ProfileForm = () => {
  const { authStore } = useStore();

  return (
    <KeyboardAvoidingView>
      <VStack paddingX={5} space={4}>
        <Box alignItems={'center'}>
          <Avatar
            size={'2xl'}
            source={{
              uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
            }}
          />
        </Box>
        <Box alignItems={'center'}>
          <Text fontSize={RFValue(20)} fontWeight={400}>
            {authStore.user?.name}
          </Text>
        </Box>
        <FormControl>
          <FormControl.Label>CPF</FormControl.Label>
          <Input
            value={authStore.user?.cpf}
            isDisabled
            size={'lg'}
            editable={false}
            pointerEvents="none"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            value={authStore.user?.mainEmail}
            removeClippedSubviews={Platform.OS == 'android'}
            isDisabled
            size={'lg'}
            editable={false}
            autoCapitalize="none"
            pointerEvents="none"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Número</FormControl.Label>
          <Input
            value={authStore.user?.mainPhoneNumber}
            isDisabled
            size={'lg'}
            editable={false}
            pointerEvents="none"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Matricula</FormControl.Label>
          <Input
            value={authStore.user?.enrollment}
            isDisabled
            size={'lg'}
            editable={false}
            pointerEvents="none"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Departamento</FormControl.Label>
          <Input
            value={authStore.user?.department}
            isDisabled
            size={'lg'}
            editable={false}
            pointerEvents="none"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Carro(s)</FormControl.Label>
          <Input
            value={authStore.user?.cars
              .map((car) => car.plate)
              .join(authStore.user?.cars.length > 1 ? ' - ' : '')}
            isDisabled
            size={'lg'}
            editable={false}
            pointerEvents="none"
          />
        </FormControl>
        <Box paddingX={36}>
          <Button onPress={() => authStore.logout()} variant={'solid'} bg={'primary'} rounded={12}>
            Sair
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  );
};
