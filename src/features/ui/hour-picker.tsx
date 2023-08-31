import useStore from '@features/app/use-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, HStack } from 'native-base';
import moment from 'moment-timezone';
import React, { useState } from 'react';

interface Props {
  open: boolean;
  setOpen: Function;
}

const HourPicker = (props: Props) => {
  const { parkingLotStore } = useStore();
  const [selectedHour, setSelectedHour] = useState<Date>(new Date());

  const handleChangeDate = (event: any, hour: Date | undefined) => {
    if (hour) {
      setSelectedHour(hour);
      if (parkingLotStore.qrCodeData?.entryDate) {
        const newDate = moment(parkingLotStore.qrCodeData?.entryDate || new Date())
          .tz('America/Sao_Paulo')
          .set({
            hour: hour.getHours(),
            minute: hour.getMinutes(),
            second: hour.getSeconds(),
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
        mode="time"
        display="spinner"
        value={parkingLotStore.qrCodeData?.entryDate || selectedHour}
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

export default HourPicker;
