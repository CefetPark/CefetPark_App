import GradientBtn from '@features/ui/gradient-btn';
import { FormControl, HStack, Input, Spinner, Text, useTheme, View, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import useToast from '@base/src/helpers/use-toast';
import useStore from '@features/app/use-store';

export interface ChangePasswordFormData {
    password: string;
    confirmPassword: string;
}

export const ChangePasswordForm = () => {
    const [dataForm, setDataForm] = useState<ChangePasswordFormData>({ password: '', confirmPassword: '' });
    const [validation, setValidation] = useState({ samePassword: false, hasSpecialCharacter: false, hasUppercaseAndLowercase: false, lengthGreaterThan8: false, });
    const theme = useTheme()
    const toast = useToast()
    const { authStore } = useStore()
    const readyToSubmit = validation.hasSpecialCharacter && validation.hasUppercaseAndLowercase && validation.lengthGreaterThan8 && validation.samePassword

    const handleSubmit = async () => {
        if (!readyToSubmit) {
            toast({ bgColor: 'warning', description: 'Você tem que completar os requisitos de senha', placement: "top", variant: "subtle" })
        } else {
            const res = await authStore.resetPassword(dataForm)
            if (!res) {
                toast({ bgColor: 'danger', description: 'Houve um erro ao tentar alterar sua senha, tente novamente.', placement: "top", variant: "subtle" })
            }
        }
    };

    useEffect(() => {
        setValidation({
            samePassword: dataForm.confirmPassword == dataForm.password && dataForm.confirmPassword != '' && dataForm.password != '',
            hasSpecialCharacter: /[^a-zA-Z0-9_]/g.test(dataForm.password),
            hasUppercaseAndLowercase: /[A-Z].*[a-z]|[a-z].*[A-Z]/.test(dataForm.password),
            lengthGreaterThan8: dataForm.password.length > 8
        })
    }, [dataForm])

    return (
        <VStack space={2} w={'100%'}>
            <FormControl.Label htmlFor="newPassword">Nova Senha</FormControl.Label>
            <Input
                h={responsiveHeight(8)}
                w={'100%'}
                size={'lg'}
                onChangeText={(text) => setDataForm({ ...dataForm, password: text })}
                maxLength={11}
                rounded={12}
                id="newPassword"
                autoCorrect={false}
                placeholder="Digite a sua senha"
            />
            <FormControl.Label htmlFor="cpf">Confirmação de Senha</FormControl.Label>
            <Input
                h={responsiveHeight(8)}
                w={'100%'}
                size={'lg'}
                onChangeText={(text) => setDataForm({ ...dataForm, confirmPassword: text })}
                maxLength={11}
                rounded={12}
                id="cpf"
                autoCorrect={false}
                placeholder="Digite novamente a sua senha"
            />
            <View>
                <HStack alignItems={'center'} space={2}>
                    <Icon name='at' size={responsiveFontSize(3)} color={validation.hasSpecialCharacter ? theme.colors.success : theme.colors.textLigth} />
                    <Text color={validation.hasSpecialCharacter ? theme.colors.success : theme.colors.textLigth}>Conter caracteres especiais</Text>
                </HStack>
                <HStack alignItems={'center'} space={2}>
                    <Icon name='format-letter-case' size={responsiveFontSize(3)} color={validation.hasUppercaseAndLowercase ? theme.colors.success : theme.colors.textLigth} />
                    <Text color={validation.hasUppercaseAndLowercase ? theme.colors.success : theme.colors.textLigth}>Letras maiúsculas e minúsculas</Text>
                </HStack>
                <HStack alignItems={'center'} space={2}>
                    <Icon name='check-all' size={responsiveFontSize(3)} color={validation.lengthGreaterThan8 ? theme.colors.success : theme.colors.textLigth} />
                    <Text color={validation.lengthGreaterThan8 ? theme.colors.success : theme.colors.textLigth}>Contém mais que 8 caracteres</Text>
                </HStack>
                <HStack alignItems={'center'} space={2}>
                    <Icon name='check-circle-outline' size={responsiveFontSize(3)} color={validation.samePassword ? theme.colors.success : theme.colors.textLigth} />
                    <Text color={validation.samePassword ? theme.colors.success : theme.colors.textLigth}>Senhas coincidem</Text>
                </HStack>
            </View>
            <View mt={'5%'}>
                <GradientBtn
                    callback={handleSubmit}
                    height={responsiveHeight(7)}
                    radius={12}
                    color='secondary'
                    fontSize='md'
                    component={<Spinner size="sm" color="secondary" />}
                    text={'Enviar'}
                    fColor='#002c58'
                    sColor='#004d99'
                />
            </View>
        </VStack >
    );
};
