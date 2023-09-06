import { CarToRemove } from '@screens/parking-remove-screen';
import { action, makeAutoObservable } from 'mobx';

import { RegisterService } from './register.service';

export interface EntryRegister {
    date: Date;
    parkingLotId: number;
    userId: number;
    carId: number;
}

class RegisterStore {
    private registerService = new RegisterService()
    constructor() {
        makeAutoObservable(this);
    }

    @action async sendRegister(entryData: EntryRegister): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        return await this.registerService.sendRegister(entryData)
    }

    @action async getRegisters(parkingLotId: number): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        return await this.registerService.getRegisters(parkingLotId)
    }

    @action async removeCar(car: CarToRemove): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        return await this.registerService.removeCar(car)
    }
}

export const registerStore = new RegisterStore()