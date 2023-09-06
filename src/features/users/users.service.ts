import { Service } from '@features/app/http-service';
import { UserModel } from '@features/auth/auth.model';
import { authStore } from '@features/auth/auth.store';

export class UserService {
    private httpService = new Service('AspnetUserId')
    constructor() { }

    async getAspNetUserId(id: string) {
        return await this.httpService.get(id, authStore.getToken(), UserModel)
    }
}