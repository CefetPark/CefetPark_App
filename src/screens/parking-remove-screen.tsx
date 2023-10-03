import useStore from '@features/app/use-store';
import { RegisterModel } from '@features/register/register.model';
import { observer } from 'mobx-react-lite';
import moment from 'moment-timezone';
import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  HStack,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface CarToRemove {
  id: number;
  dataSaida: Date;
}

const RemoveScreen = () => {
  const { registerStore, parkingLotStore } = useStore();
  const toast = useToast();
  const [cars, setCars] = useState<RegisterModel[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const getCars = async () => {
    setLoading(true);
    const req = await registerStore.getRegisters(parkingLotStore.currentParkingLot.id);
    if (req.error) {
      toast.show({
        title: 'Algo deu errado!',
        description: `${req.error.errorMessage}`,
        variant: 'subtle',
        bgColor: 'danger',
        placement: 'top',
      });
    } else {
      setCars(req.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCars();
  }, []);

  const deleteCar = async (data: CarToRemove) => {
    onClose();
    const req = await registerStore.removeCar(data);
    if (req.error) {
      toast.show({
        title: 'Algo deu errado!',
        description: 'Ocorreu um erro ao tentar remover o carro.',
        variant: 'subtle',
        bgColor: 'danger',
        placement: 'top',
      });
    } else {
      getCars();
      parkingLotStore.loadParkingLots();
    }
  };

  return (
    <SafeAreaView>
      {loading ? (
        <React.Fragment>
          <Skeleton
            flexDir={'row'}
            justifyContent={'space-evenly'}
            h={'20'}
            w={'85%'}
            alignSelf={'center'}
            rounded={'md'}
            backgroundColor={'gray.300'}
            shadow={'5'}
          />
          <Spacer />
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading fontSize="md">Carregando...</Heading>
          </HStack>
        </React.Fragment>
      ) : (
        <Box marginTop={'10%'} paddingX={5}>
          <Heading fontSize="xl" p="4" pb="3">
            <Text>{cars.length > 0 ? 'Estacionados' : 'Não há carros disponíveis'}</Text>
          </Heading>
          <FlatList
            data={cars}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="muted.800"
                pl={['0', '4']}
                pr={['0', '5']}
                py="2"
                id={item.id.toString()}
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.car.plate}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                    >
                      {item.car.model}
                    </Text>
                  </VStack>
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {`${moment(item.entryDate).format('HH:mm')}`}
                  </Text>
                  <Spacer />
                  <Center>
                    <Button bg={'danger'} variant={'solid'} onPress={() => setIsOpen(!isOpen)}>
                      Remover carro
                    </Button>
                    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                      <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Remover carro</AlertDialog.Header>
                        <AlertDialog.Body>
                          <Text>
                            Realmente deseja remover o carro esse carro de placa {item.car.plate}?
                          </Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                          <Button.Group space={2}>
                            <Button
                              variant="unstyled"
                              colorScheme="coolGray"
                              onPress={onClose}
                              ref={cancelRef}
                            >
                              Cancelar
                            </Button>
                            <Button
                              bg={'danger'}
                              variant={'solid'}
                              onPress={() => {
                                deleteCar({
                                  id: item.id,
                                  dataSaida: moment.tz('America/Sao_Paulo').toDate(),
                                });
                              }}
                            >
                              Remover
                            </Button>
                          </Button.Group>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog>
                  </Center>
                </HStack>
              </Box>
            )}
          />
          { }
        </Box>
      )}
    </SafeAreaView>
  );
};

export default observer(RemoveScreen);
