import useToast from '@base/src/helpers/use-toast';
import useStore from '@features/app/use-store';
import GradientBtn from '@features/ui/gradient-btn';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, HStack, Input, KeyboardAvoidingView, Spinner, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type DataForm = {
    name: string
    cpf: string
    sicap: string
    cars: {
        plate: string,
    }
}

const GuestForm = () => {
    const navigate = useNavigation();
    const showToast = useToast()
    const { guestStore } = useStore()
    const [dataForm, setDataForm] = useState<DataForm>(
        { name: '', cpf: '', sicap: '', cars: { plate: '' } }
    )
    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit = async () => {
        setLoading(true)
        const result = await guestStore.sendGuest(dataForm)
        showToast({
            description: result.message,
            variant: 'subtle',
            bgColor: result.error ? 'danger' : 'success',
            placement: 'top',
        })
        !result.error && navigate.goBack()
        setLoading(false)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView flex={1} behavior='height' justifyContent={'center'} paddingX={'2%'}>
                <VStack space={'1%'}>
                    <FormControl>
                        <FormControl.Label htmlFor="name">Nome</FormControl.Label>
                        <Input
                            h={responsiveHeight(8)}
                            size={'lg'}
                            rounded={12}
                            id="name"
                            onChangeText={(text) => setDataForm({ ...dataForm, name: text })}
                            autoCapitalize="none"
                            placeholder="Digite o nome"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label htmlFor="cpf">CPF</FormControl.Label>
                        <Input
                            h={responsiveHeight(8)}
                            size={'lg'}
                            rounded={12}
                            maxLength={11}
                            id="cpf"
                            keyboardType='numeric'
                            onChangeText={(text) => setDataForm({ ...dataForm, cpf: text })}
                            autoCapitalize="none"
                            placeholder="Digite o cpf"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label htmlFor="plate">Placa</FormControl.Label>
                        <Input
                            h={responsiveHeight(8)}
                            size={'lg'}
                            rounded={12}
                            id="plate"
                            autoCorrect={false}
                            onChangeText={(text) => setDataForm({ ...dataForm, cars: { ...dataForm.cars, plate: text } })}
                            autoCapitalize="none"
                            placeholder="Digite a placa"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label htmlFor="sicap">Sicap</FormControl.Label>
                        <Input
                            h={responsiveHeight(8)}
                            size={'lg'}
                            rounded={12}
                            defaultValue={dataForm.sicap}
                            id="sicap"
                            onChangeText={(text) => setDataForm({ ...dataForm, sicap: text })}
                            autoCapitalize="none"
                            maxLength={15}
                            placeholder="Digite o sicap"
                        />
                    </FormControl>
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
                        <View w={'45%'}>
                            <GradientBtn
                                condition={loading}
                                callback={onSubmit}
                                height={responsiveHeight(7)}
                                iconComponent={<Icon name='arrow-right' size={responsiveFontSize(2)} color={'white'} />}
                                radius={12}
                                color='secondary'
                                fontSize='md'
                                component={<Spinner size="sm" color="secondary" />}
                                text={'Enviar'}
                                fColor='#002c58'
                                sColor='#004d99'
                            />
                        </View>
                    </HStack>
                </VStack>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default observer(GuestForm)