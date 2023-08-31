import useStore from '@features/app/use-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, HStack } from 'native-base';
import moment from 'moment-timezone';
import React, { useState } from 'react';

interface Props {
  open: boolean;
  setOpen: Function;
}

const DatePicker = (props: Props) => {
  const { parkingLotStore } = useStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChangeDate = (event: any, date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      if (parkingLotStore.qrCodeData?.entryDate) {
        const newDate = moment(date)
          .tz('America/Sao_Paulo')
          .set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          })
          .toDate();
        parkingLotStore.setQrCodeData({
          ...parkingLotStore.qrCodeData,
          entryDate: newDate,
        });
      }
    }
  };

  return (
    <>
      <DateTimePicker
        mode="date"
        display="spinner"
        value={parkingLotStore.qrCodeData?.entryDate || selectedDate}
        onChange={handleChangeDate}
      />
      <HStack w={'100%'} paddingX={3} justifyContent={'flex-end'}>
        <Button
          onPress={() => props.setOpen(false)}
          variant={'solid'}
          bg={'primary'}
          color={'secondary'}
          rounded={12}
        >
          Salvar
        </Button>
      </HStack>
    </>
  );
};

export default DatePicker;
