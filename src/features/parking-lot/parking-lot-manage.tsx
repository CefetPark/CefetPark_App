import { useNavigation } from '@react-navigation/native';
import { HStack, Pressable, Text, useTheme, VStack } from 'native-base';
import React from 'react';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const ParkingManage = ({ setOpened }: { setOpened: Function }) => {
  const navigation = useNavigation();
  const { colors } = useTheme()
  const iconSize = responsiveWidth(25)

  return (
    <VStack
      space={4}
      alignItems="center"
      h={responsiveHeight(42)}
      justifyContent={'center'}
      backgroundColor={'white'}
      paddingY={'1%'}
      borderRadius={12}
      shadow={1}
    >
      <HStack justifyContent={'space-evenly'} w={'95%'} h={'40%'}>
        <Pressable
          w={'45%'}
          borderRadius={12}
          onPress={() => navigation.navigate('ParkingRemove' as never)}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'3%'}
          backgroundColor={colors.red[50]}
          shadow={3}
        >
          <Icon size={iconSize} name="chevron-left-box-outline" color={colors.red['400']} />
          <Text alignSelf={'center'}>
            Remover Veículo
          </Text>
        </Pressable>
        <Pressable
          w={'45%'}
          borderRadius={12}
          onPress={() => navigation.navigate('ParkingForm' as never)}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'3%'}
          backgroundColor={colors.darkBlue[50]}
          shadow={3}
        >
          <Icon size={iconSize} name="clipboard-edit-outline" color={colors.primary} />
          <Text alignSelf={'center'}>
            Inserir Manualmente
          </Text>
        </Pressable>
      </HStack>
      <HStack justifyContent={'space-evenly'} w={'95%'} h={'40%'}>
        <Pressable
          w={'45%'}
          borderRadius={12}
          onPress={() => setOpened(true)}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'3%'}
          backgroundColor={colors.gray[100]}
          shadow={3}
        >
          <Icon size={iconSize} name="qrcode" color={colors.black} />
          <Text alignSelf={'center'}>
            Ler QRCode
          </Text>
        </Pressable>
        <Pressable
          w={'45%'}
          borderRadius={12}
          onPress={() => navigation.navigate('Guest' as never)}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'3%'}
          backgroundColor={colors.green[50]}
          shadow={3}
        >
          <Icon size={iconSize} name="account-outline" color={colors.success} />
          <Text alignSelf={'center'}>
            Inserir Convidado
          </Text>
        </Pressable>
      </HStack>
    </VStack >
  );
};

export default ParkingManage;