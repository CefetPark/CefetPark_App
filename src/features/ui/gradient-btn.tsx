import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { HStack, Pressable, Text } from "native-base";
import { authStore } from '@features/auth/auth.store';

type GradientBtnProps = {
    height: number
    fColor: string
    sColor: string
    text: string
    color: string,
    fontSize: number | string
    radius: number
    condition?: boolean
    component?: any
    callback?: Function
    iconComponent?: any
    disabled?: boolean
}

const GradientBtn = (props: GradientBtnProps) => {
    return (
        <Pressable
            onPress={() => props.callback ? props.callback() : authStore.logout()}
            h={props.height}
            rounded={props.radius}
            overflow={'hidden'}
            w={'100%'}
            disabled={props.disabled || false}
        >
            <LinearGradient
                style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
                colors={[props.fColor, props.sColor]}
                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}

            >
                {
                    props.condition
                        ? props.component
                        : <HStack justifyContent={'center'} alignItems={'center'} space={'1%'}><Text color={props.color} fontSize={props.fontSize}>{props.text}</Text>{props.iconComponent}</HStack>
                }
            </LinearGradient>
        </Pressable>
    );
}

export default GradientBtn;
