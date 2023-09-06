import useStore from '@features/app/use-store';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { observer } from 'mobx-react-lite';
import { Box, Button, Text, useToast, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import { HandleData } from './handle-data-modal';
import { DataForm } from './parking-lot-form';

interface Props {
  dataForm: DataForm;
  setDataForm: Function;
  setOpenedModal: Function;
}

const QrCodeHandle = (props: Props) => {
  const { setDataForm, dataForm, setOpenedModal } = props;
  const { parkingLotStore, userStore } = useStore();
  const toast = useToast();
  const [error, setError] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const { height } = Dimensions.get('window');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    try {
      const req = await userStore.getApsNetUserId(data);
      if (req.error) {
        setError(true);
        toast.show({
          title: 'Algo deu errado!',
          description:
            'Ocorreu um problema ao tentar ler o QR-Code, se o problema persistir tente inserir manualmente.',
          variant: 'subtle',
          bgColor: 'danger',
          placement: 'top',
        });
      } else {
        if (HandleData(req.data)) {
          setDataForm({
            ...dataForm,
            carId: req.data.cars[0].id,
            parkingLotId: parkingLotStore.currentParkingLot.id,
            plate: req.data.cars[0].plate,
            userName: req.data.name,
            userId: req.data.id,
          });
        }
        setOpenedModal(false);
      }
    } catch (error) {
      setError(true);
      toast.show({
        title: 'Algo deu errado!',
        description:
          'Ocorreu um problema ao tentar ler o QR-Code, se o problema persistir tente inserir manualmente.',
        variant: 'subtle',
        bgColor: 'danger',
        placement: 'top',
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {error ? (
        <>
          <VStack space={3} flex={1} alignItems={'center'} justifyContent={'center'}>
            <Box p={4} rounded="md">
              <Button
                variant={'outline'}
                borderColor={'primary'}
                _text={{ color: 'primary' }}
                mt={2}
                onPress={() => {
                  setScanned(false);
                  setError(false);
                }}
              >
                Tentar Novamente
              </Button>
              <Button
                variant={'outline'}
                borderColor={'primary'}
                _text={{ color: 'primary' }}
                mt={2}
                onPress={() => {}}
              >
                Inserir manualmente
              </Button>
            </Box>
          </VStack>
        </>
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: height - height * 0.26, width: '100%' }}
          />
        </>
      )}
    </>
  );
};

export default observer(QrCodeHandle);
