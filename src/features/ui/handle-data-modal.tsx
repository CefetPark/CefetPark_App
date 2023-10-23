import useDate from '@base/src/helpers/use-date';
import useStore from '@features/app/use-store';
import { UserModel } from '@features/auth/auth.model';
import { CarsModel } from '@features/cars/cars.model';
import { EntryRegister } from '@features/register/register.store';
import { observer } from 'mobx-react-lite';
import { Button, Center, Modal, VStack } from 'native-base';
import React, { useEffect } from 'react';

export const HandleDataModal = observer(() => {
  const { parkingLotStore } = useStore();
  const { type, data } = parkingLotStore.unformatedData

  const handleSubmit = (data: any) => {
    const { getFormattedDate } = useDate()
    const newDataForm: EntryRegister = { carId: 0, date: getFormattedDate(), parkingLotId: 0, userId: 0, driverName: '', plate: "" };

    if (type === 'car') {
      newDataForm.carId = data.id;
      newDataForm.plate = data.plate;
    } else {
      const source = data.cars || data;
      newDataForm.carId = source[0]?.id || data.id;
      newDataForm.plate = source[0]?.plate || data.plate;
    }

    if (type === 'user') {
      newDataForm.userId = data.id;
      newDataForm.driverName = data.name;
    } else {
      const source = data.users || data;
      newDataForm.userId = source[0]?.id || data.id;
      newDataForm.driverName = source[0]?.name || data.name;
    }

    parkingLotStore.setFormatedData(newDataForm)
  }

  return (
    <Modal size={'lg'} isOpen={data} position={'relative'}>
      <Modal.Content justifyContent={'space-between'}>
        <Modal.CloseButton
          onPress={() => {
            parkingLotStore.setUnformatedData(null, 'default')
          }}
        />
        <Modal.Header>
          {type == 'car' ? 'Selecione o carro usado' : 'Selecione o nome do motorista'}
        </Modal.Header>
        <Modal.Body alignItems="center">
          <VStack space={5} padding={5}>
            {type === 'car'
              ? data?.cars.map((car: CarsModel) => {
                return (
                  <Center key={car.id}>
                    <Button
                      w={'100%'}
                      borderColor={'primary'}
                      variant={'outline'}
                      _text={{ color: 'primary' }}
                      onPress={() => {
                        handleSubmit(car);
                      }}
                    >
                      {car.plate}
                    </Button>
                  </Center>
                );
              })
              : data?.users.map((user: UserModel) => {
                return (
                  <Center key={user.id}>
                    <Button
                      w={'100%'}
                      borderColor={'primary'}
                      variant={'outline'}
                      _text={{ color: 'primary' }}
                      onPress={() => {
                        handleSubmit(user);
                      }}
                    >
                      {user.name}
                    </Button>
                  </Center>
                );
              })}
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});
