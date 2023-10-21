import { Service } from "@features/app/http-service";
import { authStore } from "@features/auth/auth.store";
import { Colors } from "./colors.model";

export class ColorsService {
    private httpService = new Service('Cor')

    constructor() { }

    async getColors() {
        return await this.httpService.getList('', authStore.authToken, Colors)
    }
}