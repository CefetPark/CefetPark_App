import useStore from '@features/app/use-store';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { observer } from 'mobx-react-lite';
import { Box, Button, Center, Modal, Text, VStack, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

interface Params {
  opened: boolean;
  setOpened: Function;
}

const QrCodeHandle = (data: Params) => {
  const { parkingLotStore, userStore } = useStore();
  const toast = useToast();
  const [error, setError] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const { height } = Dimensions.get('window');
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if (data.opened) {
      setScanned(false);
      setError(false);
    }
  }, [data.opened]);

  useEffect(() => {
    if (parkingLotStore.qrCodeData) {
      data.setOpened(false);
      navigation.navigate('ParkingForm' as never);
    }
  }, [parkingLotStore.qrCodeData]);

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
        parkingLotStore.setQrCodeData({
          carId: req.data.cars[0].id,
          parkingLotId: parkingLotStore.currentParkingLot.id,
          plate: req.data.cars[0].plate,
          userName: req.data.name,
          userId: req.data.id,
          entryDate: new Date(),
        });
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
    <Modal size={'lg'} isOpen={data.opened} position={'relative'}>
      <Modal.Content h={error ? 'auto' : '100%'} w={'95%'} justifyContent={'space-between'}>
        <Modal.CloseButton
          onPress={() => {
            parkingLotStore.setQrCodeData(null);
            data.setOpened(false);
          }}
        />
        <Modal.Header>Leitura de QrCode</Modal.Header>
        <Modal.Body>
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
                    onPress={() => {
                      parkingLotStore.setQrCodeData(null);
                      data.setOpened(false);
                      navigation.navigate('ParkingForm' as never);
                    }}
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
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default observer(QrCodeHandle);
