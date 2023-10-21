import { action, makeAutoObservable } from 'mobx';

import { DataForm } from './guest.form';
import { GuestService } from './guest.service';

class GuestStore {
    private guestService = new GuestService()
    constructor() {
        makeAutoObservable(this)
    }

    @action async sendGuest(dataForm: DataForm): Promise<{ message: string, error: boolean }> {
        try {
            const req = await this.guestService.sendGuest(dataForm)
            if (req.error) {
                return { message: req.error.errorMessage, error: true }
            }
            return { message: 'Os dados foram enviados com sucesso!', error: false }
        } catch (error) {
            return { message: 'Algo deu errado!', error: true }
        }
    }
}

export const guestStore = new GuestStore();