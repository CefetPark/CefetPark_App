import { Service } from "@features/app/http-service";
import { authStore } from "@features/auth/auth.store";
import { Models } from "./models.model";

export class ModelsService {
    private httpService = new Service('Modelo')

    constructor() { }

    async getModel() {
        return await this.httpService.getList('', authStore.authToken, Models)
    }
}