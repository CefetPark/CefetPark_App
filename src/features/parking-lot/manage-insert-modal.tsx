import { observer } from 'mobx-react-lite';
import { Button, Center, Modal, VStack } from 'native-base';
import React, { useState } from 'react';

import { DataForm } from './parking-lot-form';
import QrCodeHandle from './qr-code-handle';
import { useNavigation } from '@react-navigation/native';

interface Props {
  dataForm: DataForm;
  setDataForm: Function;
}

const manageInsertModal = (props: Props) => {
  const { setDataForm, dataForm } = props;
  const navigation = useNavigation()
  const [opened, setOpened] = useState<boolean>(true);
  const [qrCodeOpened, setQrCodeOpened] = useState<boolean>(false);

  return (
    <Modal isOpen={opened} position={'relative'}>
      <Modal.Content w={'90%'} justifyContent={'space-between'}>
        <Modal.Header>
          {qrCodeOpened ? 'Leitura de QrCode' : 'Seleciona uma opção de inserção'}
        </Modal.Header>
        <Modal.CloseButton onPress={() => { navigation.goBack() }} />
        <Modal.Body alignItems="center">
          {qrCodeOpened ? (
            <QrCodeHandle
              setOpenedModal={setOpened}
              dataForm={dataForm}
              setDataForm={setDataForm}
            />
          ) : (
            <VStack space={5} padding={5}>
              <Center>
                <Button
                  w={'100%'}
                  borderColor={'primary'}
                  variant={'outline'}
                  _text={{ color: 'primary' }}
                  onPress={() => {
                    setQrCodeOpened(true);
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
                  }}
                >
                  Inserir Manualmente
                </Button>
              </Center>
            </VStack>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default observer(manageInsertModal);
