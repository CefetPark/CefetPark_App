import { Service } from '@features/app/http-service';
import { authStore } from '@features/auth/auth.store';

import { GraphModel } from './graph.model';


export class GraphService {
    private httpService = new Service('RegistroOcupacao')

    constructor() { }

    async getGraph(parkingLotId: number) {
        return await this.httpService.getList(`/obter-grafico-hoje`, authStore.getToken(), GraphModel, { estacionamentoId: parkingLotId })
    }

}