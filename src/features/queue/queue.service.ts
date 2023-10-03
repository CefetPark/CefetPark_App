import { ReqReturn, Service } from "@features/app/http-service";
import { authStore } from "@features/auth/auth.store";
import { QueueModel } from "./queue.model";

export class QueueService {
    private httpService = new Service('FilaEstacionamento')

    constructor() { }

    async joinTheQueue(parkingLotId: number, carId: number): Promise<ReqReturn> {
        const data = {
            estacionamento_Id: parkingLotId,
            carro_Id: carId
        }
        return this.httpService.post('/entrar', authStore.getToken(), data)
    }

    async getTheQueue(parkingLotId: number): Promise<ReqReturn> {
        return this.httpService.get(`/${parkingLotId}`, authStore.getToken(), QueueModel)
    }
}