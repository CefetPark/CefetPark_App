import { carsStore } from '@features/cars/cars.store';
import { Keyboard } from 'react-native';

import { parkingLotStore } from '@features/parking-lot';
import { EntryRegister } from '@features/register/register.store';
import { } from './use-date';


const useHandleData = () => {

    const handlePlate = async (text: string, setError: Function, setLoading: Function) => {
        setError(false)
        if (text.length === 7) {
            setLoading(true);
            Keyboard.dismiss();
            await carsStore.getCarByPlate(text).then(res => {
                if (res.error) {
                    setError(true)
                    return null
                }
                setLoading(false);
                handleUnformatedData(res.data)
                return true
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleUnformatedData = (data: any) => {
        if (data.users?.length > 1) {
            parkingLotStore.setUnformatedData(data, 'user')
        } else if (data.cars?.length > 1) {
            parkingLotStore.setUnformatedData(data, 'car')
        } else {
            const newDate: EntryRegister = {
                carId: data.users ? data.id : data.cars[0].id,
                date: new Date(),
                driverName: data.users ? data.users[0].name : data.name,
                plate: data.users ? data.plate : data.cars[0].plate,
                userId: data.users ? data?.users[0].id : data.id,
                parkingLotId: parkingLotStore.currentParkingLot.id
            }
            parkingLotStore.setFormatedData(newDate)
        }
    }

    return { handlePlate, handleUnformatedData }
}

export default useHandleData
