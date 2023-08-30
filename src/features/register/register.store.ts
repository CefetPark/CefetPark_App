import { makeAutoObservable } from "mobx";
import { RegisterService } from "./register.service";
import { CarToRemove } from "@screens/parking-remove-screen";

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

    async sendRegister(entryData: EntryRegister): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        return await this.registerService.sendRegister(entryData)
    }

    async getRegisters(parkingLotId: number): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        return await this.registerService.getRegisters(parkingLotId)
    }

    async removeCar(car: CarToRemove): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        return await this.registerService.removeCar(car)
    }
}

export const registerStore = new RegisterStore()