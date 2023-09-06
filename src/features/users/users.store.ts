import { action, makeAutoObservable } from 'mobx';

import { UserService } from './users.service';

class UsersStore {
    private usersService = new UserService()
    constructor() {
        makeAutoObservable(this)
    }

    @action async getApsNetUserId(id: string) {
        return await this.usersService.getAspNetUserId(id)
    }
}

export const userStore = new UsersStore()