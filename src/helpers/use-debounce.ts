import { useRef, useState } from 'react';
import { Linking } from 'react-native';

export const useDebounce = () => {
    const taps = useRef(0);
    const address = useRef('')

    const mapsDebounce = async (adressFormated: string, callback: Function) => {
        taps.current++
        setTimeout(() => {
            taps.current = 0
        }, 1000)

        if (taps.current > 1) {
            taps.current = 0;
            address.current = adressFormated
            callback(true)
        }
    };

    const openGoodleMaps = () => {
        Linking.canOpenURL('comgooglemaps://').then((supported) => {
            if (supported) {
                Linking.openURL(`comgooglemaps://?q=${address}`);
            } else {
                Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
            }
        })
    }

    return { mapsDebounce, openGoodleMaps };
};