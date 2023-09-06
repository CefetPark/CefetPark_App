import useStore from '@features/app/use-store';
import { UserModel } from '@features/auth/auth.model';
import { CarsModel } from '@features/cars/cars.model';
import { parkingLotStore } from '@features/parking-lot';
import { observer } from 'mobx-react-lite';
import { Button, Center, Modal, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';

import { DataForm } from './parking-lot-form';

interface Props {
  dataForm: DataForm;
  setDataForm: Function;
}

export const HandleData = (data: any): boolean => {
  if (data.users?.length > 1) {
    parkingLotStore.setHandleData({ data, type: 'user' });
    return false;
  } else if (data.cars?.length > 1) {
    parkingLotStore.setHandleData({ data, type: 'car' });
    return false;
  }
  return true;
};

export const HandleDataModal = observer((props: Props) => {
  const { parkingLotStore } = useStore();
  const [opened, setOpened] = useState<boolean>(false);
  const { data, type } = parkingLotStore.handleData;

  const handleSubmit = (carId: number, plate: string, userName: string, userId: number) => {
    props.setDataForm({
      ...props.dataForm,
      carId: type === 'car' ? carId : data.cars ? data.cars[0].id : data.id,
      parkingLotId: parkingLotStore.currentParkingLot.id,
      plate: type === 'car' ? plate : data.cars ? data.cars[0].plate : data.plate,
      userId: type === 'user' ? userId : data.users ? data.users[0].id : data.id,
      userName: type === 'user' ? userName : data.users ? data.users[0].name : data.name,
    });
    parkingLotStore.setHandleData({ data: null, type: 'default' });
    setOpened(false);
  };

  useEffect(() => {
    if (parkingLotStore.handleData.data) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [parkingLotStore.handleData.data]);

  return (
    <Modal size={'lg'} isOpen={opened} position={'relative'}>
      <Modal.Content justifyContent={'space-between'}>
        <Modal.CloseButton
          onPress={() => {
            parkingLotStore.setHandleData({ data: null, type: 'default' });
            setOpened(false);
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
                          handleSubmit(car.id, car.plate, '', 0);
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
                          handleSubmit(0, '', user.name, Number(user.id));
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
