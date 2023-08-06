import { ParkingLotModel } from './parking-lot.model';
import { Service } from "@features/app/http-service";
import { authStore } from "@features/auth/auth.store";


export class ParkingLotService {
    private httpService = new Service('Estacionamento')
    
    constructor() { }

    async getParkingLots() {
        return await this.httpService.get('', ParkingLotModel)
    }
}