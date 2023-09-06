import { Service } from '@features/app/http-service';
import { authStore } from '@features/auth/auth.store';
import { CarToRemove } from '@screens/parking-remove-screen';

import { RegisterModel } from './register.model';
import { EntryRegister } from './register.store';

export interface EntryPtRegister {
    dataEntrada: Date;
    estacionamento_Id: number;
    usuario_Id: number;
    carro_id: number
}

export class RegisterService {
    private httpService = new Service(null)
    private path = 'RegistroEntradaSaida'

    constructor() { }

    async sendRegister(entryData: EntryRegister) {
        const data: EntryPtRegister = {
            dataEntrada: entryData.date,
            carro_id: entryData.carId,
            estacionamento_Id: entryData.parkingLotId,
            usuario_Id: entryData.userId
        }
        return await this.httpService.post(this.path, authStore.getToken(), data)
    }

    async getRegisters(parkingLotId: number) {
        return await this.httpService.get(`${this.path}/obter-estacionados/${parkingLotId}`, authStore.getToken(), RegisterModel,)
    }

    async removeCar(car: CarToRemove) {
        return await this.httpService.put(this.path, authStore.getToken(), car)
    }
}