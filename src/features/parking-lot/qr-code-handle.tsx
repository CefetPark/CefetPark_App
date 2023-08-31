import useStore from '@features/app/use-store';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { observer } from 'mobx-react-lite';
import { Box, Button, Center, Modal, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

interface Params {
  opened: boolean;
  setOpened: Function;
}

const QrCodeHandle = (data: Params) => {
  const { parkingLotStore } = useStore();
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
    if (parkingLotStore.qrCodeData) data.setOpened(false);
  }, [parkingLotStore.qrCodeData]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    try {
      const qrCodeData = JSON.parse(data);
      parkingLotStore.setQrCodeData(qrCodeData);
      navigation.navigate('ParkingForm' as never);
    } catch (error) {
      setError(true);
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
      <Modal.Content h={error ? 'auto' : '100%'} justifyContent={'space-between'}>
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
                  <Text>
                    Ocorreu um erro ao tentar ler o QrCode! Tente novamente ou insira manualmente.
                  </Text>
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
