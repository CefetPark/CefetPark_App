import { Service } from '@features/app/http-service';
import { authStore } from '@features/auth/auth.store';

import { CarsModel } from './cars.model';

export class CarsService {
    private httpService = new Service('Carro')
    constructor() { }

    async getCarByPlate(plate: string): Promise<{
        error: { statusError: number; errorMessage: string } | null;
        data: any;
    }> {
        const urlFormated = `/placa/${plate}`
        return await this.httpService.get(urlFormated, authStore.getToken(), CarsModel)
    }
}