import { action, makeAutoObservable, observable, reaction, runInAction } from 'mobx';

import { Colors } from './colors.model';
import { ColorsService } from './colors.service';
import { authStore } from '@features/auth/auth.store';

class ColorsStore {
    private colorsService = new ColorsService()
    @observable colors: Colors[] = []

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => authStore.authToken,
            async () => {
                authStore.authToken && this.getColors()
            }
        )
    }

    @action async getColors(): Promise<void> {
        const req = await this.colorsService.getColors()
        if (req.data) {
            runInAction(() => {
                this.colors = req.data
            })
        }
    }
}

export const colorsStore = new ColorsStore();