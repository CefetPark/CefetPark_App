import useHandleData from '@base/src/helpers/handle-data';
import useToast from '@base/src/helpers/use-toast';
import useStore from '@features/app/use-store';
import DatetimePicker from '@features/ui/datetime-picker';
import GradientBtn from '@features/ui/gradient-btn';
import { HandleDataModal } from '@features/ui/handle-data-modal';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, HStack, Input, Spinner, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface DataForm {
  parkingLotId: number;
  userId: number;
  userName: string;
  carId: number;
  plate: string;
  date: Date;
}

const ParkingLotForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { parkingLotStore, registerStore } = useStore();
  const navigate = useNavigation();
  const showToast = useToast();
  const { handlePlate } = useHandleData();
  const [error, setError] = useState(false)

  const handleSubmit = async () => {
    const { date } = parkingLotStore.formatedData
    await registerStore.sendRegister({ ...parkingLotStore.formatedData, date: new Date(date.setHours(date.getHours() - 3)) }).then(res => {
      if (res.error) {
        showToast({
          description: res.error.errorMessage,
          variant: 'subtle',
          bgColor: 'danger',
          placement: 'top',
        });
      } else {
        parkingLotStore.resetFormatedData()
        showToast({
          description: 'Os dados foram enviados com sucesso!',
          variant: 'subtle',
          bgColor: 'success',
          placement: 'top',
        });
        parkingLotStore.loadParkingLots();
        navigate.goBack()
      }
    })
  };

  const getPlate = async (plate: string) => {
    await handlePlate(plate, setError, setLoading)
  }

  return (
    <VStack flex={1} justifyContent={'center'}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label htmlFor="plate">Placa</FormControl.Label>
          <Input
            h={responsiveHeight(9)}
            size={'lg'}
            rounded={12}
            id="plate"
            defaultValue={parkingLotStore.formatedData.plate}
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={7}
            placeholder="Digite a placa"
            onChangeText={(text) => getPlate(text)}
            isDisabled={loading}
            isReadOnly={loading}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="name">Nome do motorista</FormControl.Label>
          <Input
            h={responsiveHeight(9)}
            size={'lg'}
            rounded={12}
            id="name"
            defaultValue={parkingLotStore.formatedData.driverName}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome"
            isReadOnly={!error}
          />
        </FormControl>
        <DatetimePicker />
        <HStack justifyContent={'space-between'} paddingY={5}>
          <Button
            rounded={12}
            w={'45%'}
            variant={'outline'}
            onPress={() => {
              navigate.goBack();
            }}
            _text={{ color: 'primary', fontSize: 'md' }}
          >
            Voltar
          </Button>
          <View w={'45%'}>
            <GradientBtn
              condition={loading}
              callback={handleSubmit}
              height={responsiveHeight(7)}
              radius={12}
              iconComponent={<Icon name='arrow-right' size={responsiveFontSize(2)} color={'white'} />}
              color='secondary'
              fontSize='md'
              component={<Spinner size="sm" color="secondary" />}
              text={'Enviar'}
              fColor='#002c58'
              sColor='#004d99'
            />
          </View>
        </HStack>
      </VStack>
      <HandleDataModal />
    </VStack>
  );
}

export default observer(ParkingLotForm);