import 'moment/locale/pt-br';

import moment from 'moment-timezone';
import { useState } from 'react';

const useDate = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const setDate = (date: Date) => {
        setSelectedDate(date);
    };

    const getFormattedDate = (): Date => {
        const currentDateInSaoPaulo = selectedDate
            ? moment(selectedDate).tz('America/Sao_Paulo')
            : moment().tz('America/Sao_Paulo');
        return currentDateInSaoPaulo.toDate();
    };

    return {
        selectedDate,
        setDate,
        getFormattedDate,
    };
};

export default useDate;
