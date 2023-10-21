import { carsStore } from '@features/cars/cars.store';
import { Keyboard } from 'react-native';

import { parkingLotStore } from '@features/parking-lot';
import { EntryRegister } from '@features/register/register.store';


const useHandleData = () => {

    const handlePlate = async (text: string, setError: Function, setLoading: Function) => {
        setError(false)
        if (text.length === 7) {
            setLoading(true);
            Keyboard.dismiss();
            await carsStore.getCarByPlate(text).then(res => {
                console.log(res)
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
                carId: data.id,
                date: new Date(),
                driverName: data.users[0].name,
                plate: data.plate,
                userId: data.users[0].id,
                parkingLotId: parkingLotStore.currentParkingLot.id
            }
            parkingLotStore.setFormatedData(newDate)
        }
    }

    return { handlePlate, handleUnformatedData }
}

export default useHandleData
