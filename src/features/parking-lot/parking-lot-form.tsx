import 'moment/locale/pt-br';

import useStore from '@features/app/use-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import moment from 'moment-timezone';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Pressable,
  Spinner,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard, Platform } from 'react-native';

import { HandleData, HandleDataModal } from './handle-data-modal';
import ManageInsertModal from './manage-insert-modal';

export interface DataForm {
  parkingLotId: number;
  userId: number;
  userName: string;
  carId: number;
  plate: string;
  date: Date;
}

const getDate = (date?: any) => {
  const currentDateInSaoPaulo = date
    ? moment(date).tz('America/Sao_Paulo')
    : moment().tz('America/Sao_Paulo');
  return currentDateInSaoPaulo.toDate();
};

const ParkingLotForm = () => {
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<DataForm>({
    carId: 0,
    date: getDate(),
    parkingLotId: 0,
    userId: 0,
    plate: '',
    userName: '',
  });
  const { parkingLotStore, carsStore, registerStore } = useStore();
  const navigate = useNavigation();

  const [date, setDate] = useState(getDate());
  const [time, setTime] = useState(getDate());
  const [mode, setMode] = useState<'date' | 'time' | 'datetime'>(
    Platform.OS === 'ios' ? 'datetime' : 'date'
  );
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false)

  const onChange = (event: any, selectedValue: any) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'datetime') {
      setDate(selectedValue);
      setDataForm({ ...dataForm, date: getDate(selectedValue) });
    } else if (mode == 'date') {
      if (selectedValue) {
        const currentDate = selectedValue || getDate();
        setDate(currentDate);
        setDataForm({ ...dataForm, date: getDate(selectedValue) });
      }
      setMode('time');
      setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || getDate();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode(Platform.OS === 'ios' ? 'datetime' : 'date');
    }
  };

  const showMode = (currentMode: 'datetime' | 'date') => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSubmit = async () => {
    setDataForm({
      ...dataForm,
      date: new Date(dataForm.date.setHours(dataForm.date.getHours() - 3)),
    });
    const res = await registerStore.sendRegister(dataForm);
    if (res.error) {
      toast.show({
        title: 'Algo deu errado!',
        description: res.error.errorMessage,
        variant: 'subtle',
        bgColor: 'danger',
        placement: 'top',
      });
    } else {
      setDataForm({
        carId: 0,
        date: getDate(),
        parkingLotId: parkingLotStore.currentParkingLot.id,
        plate: '',
        userId: 0,
        userName: '',
      });
      toast.show({
        title: 'Tudo certo!',
        description: 'Os dados foram enviados com sucesso!',
        variant: 'subtle',
        bgColor: 'success',
        placement: 'top',
      });
      parkingLotStore.loadParkingLots();
      navigate.goBack()
    }
  };

  const handlePlate = async (text: string) => {
    setError(false)
    if (text.length === 7) {
      setLoading(true);
      Keyboard.dismiss();
      const { data, error } = await carsStore.getCarByPlate(text);
      if (error) {
        setError(true)
        toast.show({
          title: 'Algo deu errado!',
          description: 'Erro ao buscar informações do carro.',
          variant: 'subtle',
          bgColor: 'danger',
          placement: 'top',
        });
      } else {
        if (HandleData(data)) {
          setDataForm({
            ...dataForm,
            carId: data.id,
            parkingLotId: parkingLotStore.currentParkingLot.id,
            plate: data.plate,
            userId: data.users[0].id,
            userName: data.users[0].name,
          });
        }
      }
      setLoading(false);
    }
  };

  return (
    <VStack flex={1} justifyContent={'center'}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label htmlFor="plate">Placa</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            rounded={12}
            id="plate"
            defaultValue={dataForm.plate ? dataForm.plate : ''}
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
          <FormControl.Label htmlFor="name">Nome do motorista</FormControl.Label>
          <Input
            h={'16'}
            size={'lg'}
            rounded={12}
            id="name"
            defaultValue={dataForm.userName}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome"
            isReadOnly={!error}
          />
        </FormControl>
        <View>
          <FormControl.Label htmlFor="name">Data</FormControl.Label>
          <Pressable
            justifyContent={'center'}
            paddingLeft={2}
            rounded={12}
            id="entryDate"
            h={'16'}
            borderColor={'gray.300'}
            borderWidth={1}
            onPress={() => showMode(Platform.OS === 'ios' ? 'datetime' : 'date')}
          >
            <Text fontSize={18}>
              {Platform.OS === 'ios' ? formatDateIOS(date) : formatDate(date, time)}
            </Text>
          </Pressable>
          {show && (
            <View paddingRight={5} paddingTop={5}>
              <DateTimePicker
                style={{ alignSelf: 'flex-start' }}
                maximumDate={getDate()}
                timeZoneOffsetInMinutes={-3 * 60}
                value={date}
                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                locale="pt-br"
                mode={mode}
                onChange={onChange}
              />
              {Platform.OS === 'ios' ? (
                <Button
                  variant={'solid'}
                  bg={'primary'}
                  rounded={12}
                  alignSelf={'flex-end'}
                  onPress={() => setShow(false)}
                >
                  Confirmar data
                </Button>
              ) : (
                <></>
              )}
            </View>
          )}
        </View>
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

      <ManageInsertModal dataForm={dataForm} setDataForm={setDataForm} />
      <HandleDataModal dataForm={dataForm} setDataForm={setDataForm} />
    </VStack>
  );
}

export default observer(ParkingLotForm);

const formatDate = (date: any, time: any) => {
  return `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
}

const formatDateIOS = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}