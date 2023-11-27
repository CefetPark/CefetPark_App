import { ChangePasswordForm } from '@features/auth/reset.password.form';
import { Image, View } from 'native-base';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const ChangePassword = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ height: '80%', width: '90%', alignSelf: 'center' }} behavior='position'>
                <View w={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <View height={'85%'} alignSelf={'center'} w={'100%'} alignItems={'center'} >
                        <Image
                            resizeMode="contain"
                            source={require('@assets/logo.png')}
                            alt="Alternate Text"
                        />
                        <ChangePasswordForm />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChangePassword;
