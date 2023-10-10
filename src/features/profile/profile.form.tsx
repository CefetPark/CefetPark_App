import useStore from '@features/app/use-store';
import { LoginTypes } from '@types';
import { Avatar, Box, Button, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const ProfileForm = () => {
  const { authStore } = useStore();
  return (
    <View flex={1}>
      <VStack paddingX={5} flex={1} justifyContent={'space-evenly'}>
        <Box alignItems={'center'}>
          {
            Dimensions.get('window').height > 650 && <Avatar
              shadow={3}
              size={'xl'}
              source={{
                uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
              }}
            />
          }
        </Box>
        <Box alignItems={'center'}>
          <Text fontSize={RFValue(20)} fontWeight={400}>
            {authStore.user?.name}
          </Text>
        </Box>
        <Box>
          <Text>CPF</Text>
          <Box
            borderRadius={12}
            borderColor={'gray.300'}
            backgroundColor={'white'}
            borderWidth={1}
            shadow={3}
            h={'12'}
            paddingLeft={3}
            justifyContent={'center'}
          >
            <Text>{authStore.user?.cpf}</Text>
          </Box>
        </Box>
        <Box>
          <Text>E-mail</Text>
          <Box
            borderRadius={12}
            borderColor={'gray.300'}
            backgroundColor={'white'}
            shadow={3}
            borderWidth={1}
            h={'12'}
            paddingLeft={3}
            justifyContent={'center'}
          >
            <Text>{authStore.user?.mainEmail}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Número</Text>
          <Box
            borderRadius={12}
            borderColor={'gray.300'}
            backgroundColor={'white'}
            shadow={3}
            borderWidth={1}
            h={'12'}
            paddingLeft={3}
            justifyContent={'center'}
          >
            <Text>{authStore.user?.mainPhoneNumber}</Text>
          </Box>
        </Box>
        <Box>
          <Text >Matricula</Text>
          <Box
            borderRadius={12}
            borderColor={'gray.300'}
            backgroundColor={'white'}
            shadow={3}
            borderWidth={1}
            h={'12'}
            paddingLeft={3}
            justifyContent={'center'}
          >
            <Text>{authStore.user?.enrollment}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Departamento</Text>
          <Box
            borderRadius={12}
            borderColor={'gray.300'}
            backgroundColor={'white'}
            shadow={3}
            borderWidth={1}
            h={'12'}
            paddingLeft={3}
            justifyContent={'center'}
          >
            <Text>{authStore.user?.department}</Text>
          </Box>
        </Box>
        {authStore.user?.userType == LoginTypes.Driver ? (
          <Box>
            <Text>Carro(s)</Text>
            <Box
              borderRadius={12}
              borderColor={'gray.300'}
              backgroundColor={'white'}
              shadow={3}
              borderWidth={1}
              h={'12'}
              paddingLeft={3}
              justifyContent={'center'}
            >
              <Text>
                {authStore.user?.cars
                  .map((car) => car.plate)
                  .join(authStore.user?.cars.length > 1 ? ' - ' : '')}
              </Text>
            </Box>
          </Box>
        ) : (
          <></>
        )}
        <Box paddingX={36} >
          <Button shadow={3} onPress={() => authStore.logout()} variant={'solid'} bg={'primary'} rounded={12}>
            Sair
          </Button>
        </Box>
      </VStack>
    </View>
  );
};
