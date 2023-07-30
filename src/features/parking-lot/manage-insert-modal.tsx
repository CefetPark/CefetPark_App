import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Button, Center, Modal, VStack } from 'native-base';
import React from 'react';

interface Params {
  opened: boolean;
  setOpened: Function;
  setOpenedQrCode: Function;
}

const manageInsertModal = ({ opened, setOpened, setOpenedQrCode }: Params) => {
  const navigation = useNavigation();
  return (
    <Modal size={'lg'} isOpen={opened} position={'relative'}>
      <Modal.Content justifyContent={'space-between'}>
        <Modal.CloseButton
          onPress={() => {
            setOpened(false);
          }}
        />
        <Modal.Header>Seleciona uma opção de inserção</Modal.Header>
        <Modal.Body alignItems="center">
          <VStack space={5} padding={5}>
            <Center>
              <Button
                w={'100%'}
                borderColor={'primary'}
                variant={'outline'}
                _text={{ color: 'primary' }}
                onPress={() => {
                  setOpened(false);
                  setOpenedQrCode(true);
                }}
              >
                Ler QrCode
              </Button>
            </Center>
            <Center>
              <Button
                w={'100%'}
                borderColor={'primary'}
                variant={'outline'}
                _text={{ color: 'primary' }}
                onPress={() => {
                  setOpened(false);
                  navigation.navigate('ParkingForm' as never);
                }}
              >
                Inserir Manualmente
              </Button>
            </Center>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default observer(manageInsertModal);
