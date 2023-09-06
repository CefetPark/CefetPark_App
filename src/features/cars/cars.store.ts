import { action, makeAutoObservable } from 'mobx';

import { CarsService } from './cars.service';

export class CarsStore {
    private carsService = new CarsService()
    constructor() {
        makeAutoObservable(this);
    }

    @action async getCarByPlate(plate: string) {
        return await this.carsService.getCarByPlate(plate)
    }
}

export const carsStore = new CarsStore()