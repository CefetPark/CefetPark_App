import useStore from '@features/app/use-store';
import GradientBtn from '@features/ui/gradient-btn';
import { LoginTypes } from '@types';
import { Avatar, Box, Button, Text, View, VStack, ScrollView } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { RFValue } from 'react-native-responsive-fontsize';

export const ProfileForm = () => {
  const { authStore } = useStore();
  return (
    <ScrollView h={'100%'} display={'flex'} paddingX={'1%'}>
      <Box alignItems={'center'} mt={'3%'}>
        {
          Dimensions.get('window').height > 650 && <Avatar
            shadow={3}
            size={responsiveFontSize(25)}
            source={{
              uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
            }}
          />
        }
      </Box>
      <Box
        mt={'10%'}
        borderRadius={12}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        borderWidth={1}
        shadow={3}
        h={responsiveHeight(6.5)}
        paddingLeft={3}
        paddingX={'3%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Text>Nome:</Text>
        <Text>{authStore.user?.name}</Text>
      </Box>
      <Box
        mt={'4%'}
        borderRadius={12}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        borderWidth={1}
        shadow={3}
        h={responsiveHeight(6.5)}
        paddingLeft={3}
        paddingX={'3%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Text>CPF:</Text>
        <Text>{authStore.user?.cpf}</Text>
      </Box>
      <Box
        mt={'4%'}
        borderRadius={12}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        borderWidth={1}
        shadow={3}
        h={responsiveHeight(6.5)}
        paddingLeft={3}
        paddingX={'3%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Text>E-mail:</Text>
        <Text>{authStore.user?.mainEmail}</Text>
      </Box>
      <Box
        mt={'4%'}
        borderRadius={12}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        borderWidth={1}
        shadow={3}
        h={responsiveHeight(6.5)}
        paddingLeft={3}
        paddingX={'3%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Text>Número:</Text>
        <Text>{authStore.user?.mainPhoneNumber}</Text>
      </Box>
      <Box
        mt={'4%'}
        borderRadius={12}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        borderWidth={1}
        shadow={3}
        h={responsiveHeight(6.5)}
        paddingLeft={3}
        paddingX={'3%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Text >Matricula:</Text>
        <Text>{authStore.user?.enrollment}</Text>
      </Box>
      <Box
        mt={'4%'}
        borderRadius={12}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        borderWidth={1}
        shadow={3}
        h={responsiveHeight(6.5)}
        paddingLeft={3}
        paddingX={'3%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}
      >
        <Text>Departamento:</Text>
        <Text>{authStore.user?.department}</Text>
      </Box>
      {authStore.user?.userType == LoginTypes.Driver && (
        <Box>

          <Box
            mt={'4%'}
            borderRadius={12}
            borderColor={'gray.300'}
            backgroundColor={'white'}
            borderWidth={1}
            shadow={3}
            h={responsiveHeight(6.5)}
            paddingLeft={3}
            paddingX={'3%'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexDirection={'row'}
          >
            <Text>Carro(s):</Text>
            <Text>
              {authStore.user?.cars
                .map((car) => car.plate)
                .join(authStore.user?.cars.length > 1 ? ' - ' : '')}
            </Text>
          </Box>
        </Box>
      )}
      <Box paddingX={36} mt={'4%'}>
        <GradientBtn
          height={responsiveHeight(6.5)}
          radius={12}
          color='secondary'
          fontSize='md'
          text={'Sair'}
          fColor='#002c58'
          sColor='#004d99'
        />
      </Box>
    </ScrollView>
  );
};
