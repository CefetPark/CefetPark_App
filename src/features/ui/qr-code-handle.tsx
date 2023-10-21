import useToast from '@base/src/helpers/use-toast';
import useStore from '@features/app/use-store';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { observer } from 'mobx-react-lite';
import { Modal, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const QrCodeHandle = ({ opened, setOpened }: { opened: boolean, setOpened: Function }) => {
  const { userStore } = useStore();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const toast = useToast()

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    opened && setScanned(false)
  }, [opened])

  useEffect(() => {
    if (scanned && !opened && userStore.id) navigation.navigate('ParkingForm' as never)
  }, [opened, scanned])

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (data.length != 36) {
      setScanned(true);
      setOpened(false)
      toast({
        bgColor: 'warning',
        description: 'O QrCode escaniado não é válido.',
        placement: 'top',
        variant: 'subtle',
      })
    } else {
      userStore.setId(data);
      setScanned(true);
      setOpened(false)
    }
  };

  return (
    <Modal isOpen={opened} size={'full'}>
      <Modal.Content>
        <Modal.CloseButton bgColor={'white'} onPress={() => setOpened(false)} />
        <Modal.Body>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: responsiveHeight(72) }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default observer(QrCodeHandle);
