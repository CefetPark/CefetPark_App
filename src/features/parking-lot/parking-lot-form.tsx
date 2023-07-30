import useStore from '@features/app/use-store';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';
import { Button, FormControl, HStack, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface VehicleFormData {
  name: string;
  car: string;
  plate: string;
  entryDate: Date;
}

const ParkingLotForm = () => {
  const { parkingLotStore } = useStore();
  const qrCodeData = parkingLotStore.qrCodeData;
  const dateFormated = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>();
  const onSubmit: SubmitHandler<VehicleFormData> = (event) => {};
  const submit = handleSubmit(onSubmit);

  return (
    <VStack space={'16'} w={'100%'}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label htmlFor="plate">Placa</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            {...register('plate', { required: true })}
            rounded={12}
            id="plate"
            defaultValue={qrCodeData ? qrCodeData.plate : ''}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite a placa"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="car">Carro</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            {...register('car', { required: true })}
            rounded={12}
            id="car"
            defaultValue={qrCodeData ? qrCodeData.car : ''}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o carro"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="name">Nome</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            {...register('name', { required: true })}
            rounded={12}
            id="name"
            defaultValue={qrCodeData ? qrCodeData.name : ''}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="entryDate">Data de entrada</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            {...register('entryDate', { required: true })}
            rounded={12}
            id="entryDate"
            defaultValue={dateFormated}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite a data atual"
          />
        </FormControl>
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
          onPress={() => submit()}
          _text={{ color: 'secondary', fontSize: 'md' }}
        >
          Entrar
        </Button>
      </HStack>
    </VStack>
  );
};

export default ParkingLotForm;
