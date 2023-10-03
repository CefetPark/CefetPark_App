import { action, makeAutoObservable, observable, runInAction } from "mobx"
import { QueueService } from "./queue.service";
import { QueueModel } from "./queue.model";

export class QueueStore {
    @observable queue: QueueModel = { members: [], parkingLotId: 0, parkingRequest: null }
    private queueService = new QueueService()
    constructor() {
        makeAutoObservable(this);
    }

    @action async joinTheQueue(parkingLotId: number, carId: number) {
        return this.queueService.joinTheQueue(parkingLotId, carId)
    }

    @action async getTheQueue(parkingLotId: number) {
        const req = await this.queueService.getTheQueue(parkingLotId)
        if (req.data) {
            runInAction(() => {
                this.queue = req.data
            })
        }
        return req
    }
}

export const queueStore = new QueueStore()