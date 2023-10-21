import { action, makeAutoObservable, observable, reaction, runInAction, when } from 'mobx';

import { UserService } from './users.service';
import { parkingLotStore } from '@features/parking-lot';
import useHandleData from '@base/src/helpers/handle-data';

class UsersStore {
    private usersService = new UserService()
    @observable id = ''
    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.id,
            () => {
                if (this.id !== '') {
                    this.getApsNetUserId()
                }
            }
        )
    }

    @action setId(id: string) {
        runInAction(() => {
            this.id = id
        })
    }

    @action async getApsNetUserId() {
        const req = await this.usersService.getAspNetUserId(this.id)
        const { handleUnformatedData } = useHandleData()
        if (req.data) {
            runInAction(() => {
                handleUnformatedData(req.data)
                this.id = ''
            })
        }
    }
}

export const userStore = new UsersStore()