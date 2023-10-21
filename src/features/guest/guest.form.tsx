import useToast from '@base/src/helpers/use-toast';
import useStore from '@features/app/use-store';
import { Colors } from '@features/colors/colors.model';
import { Models } from '@features/models/models.model';
import ActionSheetComponent from '@features/ui/actionSheet';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, HStack, Input, KeyboardAvoidingView, Spinner, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

export type DataForm = {
    name: string
    cpf: string
    cars: {
        plate: string,
        colorName: string,
        colorId: number,
        modelName: string,
        modelId: number
    }
}

const GuestForm = () => {
    const navigate = useNavigation();
    const showToast = useToast()
    const { colorsStore, guestStore, modelsStore } = useStore()
    const [dataForm, setDataForm] = useState<DataForm>(
        { name: '', cpf: '', cars: { colorId: 0, colorName: '', modelId: 0, modelName: '', plate: '' } }
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [colorActionsheet, setColorActionsheet] = useState<{ data: Colors[], opened: boolean }>({ data: [], opened: false })
    const [modelActionsheet, setModelActionsheet] = useState<{ data: Models[], opened: boolean }>({ data: [], opened: false })

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

    const filterColors = (text: string) => {
        if (text.length > 2) {
            const matchs = colorsStore.colors.filter(cor => cor.name.substring(0, text.length).toLowerCase() == text.toLowerCase())
            if (matchs.length > 0) {
                Keyboard.dismiss()
                setColorActionsheet({ data: matchs, opened: true })
            }
        }
    }

    const selectColor = (color?: Colors) => {
        if (color) {
            setDataForm({ ...dataForm, cars: { ...dataForm.cars, colorId: color.id, colorName: color.name } })
            setColorActionsheet({ data: [], opened: false })
        } else {
            setDataForm({ ...dataForm, cars: { ...dataForm.cars, colorId: 0, colorName: '' } })
            setColorActionsheet({ data: [], opened: false })
        }
    }

    const filterModels = (text: string) => {
        if (text.length > 1) {
            const matchs = modelsStore.models.filter(models => models.name.substring(0, text.length).toLowerCase() == text.toLowerCase())
            if (matchs.length > 0) {
                Keyboard.dismiss()
                setModelActionsheet({ data: matchs, opened: true })
            }
        }
    }

    const selectModels = (model?: Models) => {
        if (model) {
            setDataForm({ ...dataForm, cars: { ...dataForm.cars, modelId: model.id, modelName: model.name } })
            setModelActionsheet({ data: [], opened: false })
        } else {
            setDataForm({ ...dataForm, cars: { ...dataForm.cars, modelId: 0, modelName: '' } })
            setModelActionsheet({ data: [], opened: false })
        }
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
                        <FormControl.Label htmlFor="color">Cor</FormControl.Label>
                        <Input
                            h={responsiveHeight(8)}
                            size={'lg'}
                            rounded={12}
                            defaultValue={dataForm.cars.colorName}
                            id="color"
                            onChangeText={(text) => filterColors(text)}
                            autoCapitalize="none"
                            placeholder="Digite o cor"
                        />
                    </FormControl>
                    <ActionSheetComponent data={colorActionsheet.data as any} opened={colorActionsheet.opened} selectFunction={selectColor} />
                    <FormControl>
                        <FormControl.Label htmlFor="model">Modelo</FormControl.Label>
                        <Input
                            h={responsiveHeight(8)}
                            size={'lg'}
                            rounded={12}
                            defaultValue={dataForm.cars.modelName}
                            id="model"
                            onChangeText={(text) => filterModels(text)}
                            autoCapitalize="none"
                            placeholder="Digite o modelo"

                        />
                    </FormControl>
                    <ActionSheetComponent data={modelActionsheet.data as any} opened={modelActionsheet.opened} selectFunction={selectModels} />
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
                        <Button
                            rounded={12}
                            w={'45%'}
                            h={responsiveHeight(6.5)}
                            variant={'solid'}
                            backgroundColor={'primary'}
                            onPress={() => onSubmit()}
                            _text={{ color: 'secondary', fontSize: 'md' }}
                            isLoading={loading}
                        >
                            {loading ? <Spinner size="sm" color="secondary" /> : 'Enviar'}
                        </Button>
                    </HStack>
                </VStack>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default observer(GuestForm)