import useDate from '@base/src/helpers/use-date';
import useStore from '@features/app/use-store';
import parkingLotForm, { DataForm } from '@features/parking-lot/parking-lot-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, FormControl, Pressable, Text, View } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';


const DatetimePicker = () => {
    const { parkingLotStore } = useStore()
    const { selectedDate, setDate, getFormattedDate } = useDate();
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(getFormattedDate());
    const [mode, setMode] = useState<'date' | 'time' | 'datetime'>(
        Platform.OS === 'ios' ? 'datetime' : 'date'
    );

    const onChange = (event: any, selectedValue: any) => {
        setShow(Platform.OS === 'ios');
        const { formatedData } = parkingLotStore
        if (mode == 'datetime') {
            setDate(selectedValue);
            parkingLotStore.setFormatedData({ ...formatedData, date: getFormattedDate() });
        } else if (mode == 'date') {
            if (selectedValue) {
                const currentDate = selectedValue || selectedDate;
                setDate(currentDate);
                parkingLotStore.setFormatedData({ ...formatedData, date: getFormattedDate() });
            }
            setMode('time');
            setShow(Platform.OS !== 'ios');
        } else {
            const selectedTime = selectedValue || getFormattedDate();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios');
            setMode(Platform.OS === 'ios' ? 'datetime' : 'date');
        }
    };

    const showMode = (currentMode: 'datetime' | 'date') => {
        setShow(true);
        setMode(currentMode);
    };

    return (
        <View>
            <FormControl.Label htmlFor="name">Data</FormControl.Label>
            <Pressable
                justifyContent={'center'}
                paddingLeft={2}
                rounded={12}
                id="entryDate"
                h={responsiveHeight(9)}
                borderColor={'gray.300'}
                borderWidth={1}
                onPress={() => showMode(Platform.OS === 'ios' ? 'datetime' : 'date')}
            >
                <Text fontSize={18}>
                    {Platform.OS === 'ios' ? formatDateIOS(selectedDate) : formatDate(selectedDate, time)}
                </Text>
            </Pressable>
            {show && (
                <View paddingRight={5} paddingTop={5}>
                    <DateTimePicker
                        style={{ alignSelf: 'flex-start' }}
                        maximumDate={getFormattedDate()}
                        timeZoneOffsetInMinutes={-3 * 60}
                        value={selectedDate}
                        display={Platform.OS === 'ios' ? 'compact' : 'default'}
                        locale="pt-br"
                        mode={mode}
                        onChange={onChange}
                    />
                    {Platform.OS === 'ios' ? (
                        <Button
                            variant={'solid'}
                            bg={'primary'}
                            rounded={12}
                            alignSelf={'flex-end'}
                            onPress={() => setShow(false)}
                        >
                            Confirmar data
                        </Button>
                    ) : (
                        <></>
                    )}
                </View>
            )}
        </View>
    )
}

const formatDate = (date: any, time: any) => {
    return `${date.getDate()}/${date.getMonth() + 1
        }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
}

const formatDateIOS = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export default DatetimePicker