import useStore from '@features/app/use-store';
import DatePicker from '@features/ui/date-picker';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import moment from 'moment-timezone';
import { Button, FormControl, HStack, Input, Pressable, Spinner, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useToast } from 'native-base';
import 'moment/locale/pt-br';
import { Keyboard } from 'react-native';
import HourPicker from '@features/ui/hour-picker';
import { EntryRegister } from '@features/register/register.store';

interface VehicleFormData {
  name: string;
  plate: string;
}

const ParkingLotForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { parkingLotStore, carsStore, registerStore } = useStore();
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openHour, setOpenHour] = useState<boolean>(false);
  const navigate = useNavigation();

  const handleSubmit = async () => {
    if (parkingLotStore.qrCodeData) {
      const qrCodeData: EntryRegister = {
        date: parkingLotStore.qrCodeData.entryDate,
        carId: parkingLotStore.qrCodeData.carId,
        parkingLotId: parkingLotStore.qrCodeData.parkingLotId,
        userId: parkingLotStore.qrCodeData.userId,
      };

      const res = await registerStore.sendRegister(qrCodeData);
      if (res.error) {
        toast.show({
          description: res.error.errorMessage,
          bgColor: 'danger',
        });
      } else {
        toast.show({ description: 'Dados enviados!', bgColor: 'success' });
        parkingLotStore.setQrCodeData(null);
      }
    }
  };

  const handlePlate = async (text: string) => {
    if (text.length === 7) {
      setLoading(true);
      Keyboard.dismiss();
      try {
        await carsStore.getCarByPlate(text);
      } catch (error) {
        toast.show({
          description: 'Erro ao buscar informações do carro.',
          bgColor: 'danger',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <VStack space={'16'} w={'100%'}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label htmlFor="plate">Placa</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            rounded={12}
            id="plate"
            defaultValue={parkingLotStore.qrCodeData ? parkingLotStore.qrCodeData.plate : ''}
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={7}
            placeholder="Digite a placa"
            onChangeText={(text) => handlePlate(text)}
            isDisabled={loading}
            isReadOnly={loading}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="name">Nome do usuário</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            rounded={12}
            id="name"
            defaultValue={parkingLotStore.qrCodeData ? parkingLotStore.qrCodeData.userName : ''}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome"
            isReadOnly
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="entryDate">Data de entrada</FormControl.Label>
          <Pressable
            justifyContent={'center'}
            paddingLeft={2}
            rounded={12}
            id="entryDate"
            h={'16'}
            borderColor={'gray.300'}
            borderWidth={1}
            onPress={() => {
              if (parkingLotStore.qrCodeData) setOpenDate(true);
            }}
          >
            <Text fontSize={18}>
              {moment(parkingLotStore.qrCodeData?.entryDate)
                .locale('pt-br')
                .format('LL') || ''}
            </Text>
          </Pressable>
        </FormControl>
        {openDate && parkingLotStore.qrCodeData && (
          <DatePicker open={openDate} setOpen={setOpenDate} />
        )}
        <FormControl>
          <FormControl.Label htmlFor="entryDate">Hora da entrada</FormControl.Label>
          <Pressable
            justifyContent={'center'}
            paddingLeft={2}
            rounded={12}
            id="entryDate"
            h={'16'}
            borderColor={'gray.300'}
            borderWidth={1}
            onPress={() => {
              if (parkingLotStore.qrCodeData) setOpenHour(true);
            }}
          >
            <Text fontSize={18}>
              {moment(parkingLotStore.qrCodeData?.entryDate)
                .locale('pt-br')
                .format('LT') || ''}
            </Text>
          </Pressable>
        </FormControl>
        {openHour && parkingLotStore.qrCodeData && (
          <HourPicker open={openHour} setOpen={setOpenHour} />
        )}
      </VStack>

      <HStack justifyContent={'space-between'}>
        <Button
          rounded={12}
          w={'45%'}
          variant={'outline'}
          onPress={() => {
            parkingLotStore.setQrCodeData(null);
            navigate.goBack();
          }}
          _text={{ color: 'primary', fontSize: 'md' }}
        >
          Voltar
        </Button>
        <Button
          rounded={12}
          w={'45%'}
          variant={'solid'}
          backgroundColor={'primary'}
          onPress={() => handleSubmit()}
          _text={{ color: 'secondary', fontSize: 'md' }}
          isLoading={loading}
        >
          {loading ? <Spinner size="sm" color="secondary" /> : 'Enviar'}
        </Button>
      </HStack>
    </VStack>
  );
};

export default observer(ParkingLotForm);
