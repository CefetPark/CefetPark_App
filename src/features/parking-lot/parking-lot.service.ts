import { Service } from '@features/app/http-service';
import { authStore } from '@features/auth/auth.store';

import { ParkingLotModel } from './parking-lot.model';


export class ParkingLotService {
    private httpService = new Service('Estacionamento')

    constructor() { }

    async getParkingLots() {
        return await this.httpService.getList('', authStore.getToken(), ParkingLotModel)
    }

    async getCurrentParkingLot(id: string) {
        return await this.httpService.get(`/${id}`, authStore.getToken(), ParkingLotModel)
    }

}