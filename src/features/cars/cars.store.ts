import { makeAutoObservable } from 'mobx';

import { CarsService } from './cars.service';
import { parkingLotStore } from '@features/parking-lot';

export class CarsStore {
    private carsService = new CarsService()
    constructor() {
        makeAutoObservable(this);
    }

    async getCarByPlate(plate: string) {
        const req = await this.carsService.getCarByPlate(plate)
        if (req.data) {
            parkingLotStore.setQrCodeData({
                plate: req.data.plate,
                carId: req.data.id,
                userName: req.data.users[0].name,
                userId: req.data.users[0].id,
                parkingLotId: parkingLotStore.currentParkingLot.id,
                entryDate: new Date()
            })
        }
        return req
    }
}

export const carsStore = new CarsStore()