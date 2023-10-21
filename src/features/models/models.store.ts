import { action, makeAutoObservable, observable, reaction, runInAction } from 'mobx';

import { Models } from './models.model';
import { ModelsService } from './models.service';
import { authStore } from '@features/auth/auth.store';

class ModelsStore {
    private modelsService = new ModelsService()
    @observable models: Models[] = []

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => authStore.authToken,
            async () => {
                authStore.authToken && this.getModels()
            }
        )
    }

    @action async getModels(): Promise<void> {
        const req = await this.modelsService.getModel()
        if (req.data) {
            runInAction(() => {
                this.models = req.data
            })
        }
    }
}

export const modelsStore = new ModelsStore()