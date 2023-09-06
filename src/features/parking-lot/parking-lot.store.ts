import { authStore } from '@features/auth/auth.store';
import { action, makeAutoObservable, observable, reaction, runInAction } from 'mobx';

import { ParkingLotModel } from './parking-lot.model';
import { ParkingLotService } from './parking-lot.service';

class ParkingLotStore {
  @observable isLoading: boolean = false
  @observable parkingLots: ParkingLotModel[] = [];
  @observable currentParkingLot!: ParkingLotModel
  @observable handleData: { type: 'car' | 'user' | 'default', data: any } = { type: 'default', data: null }
  private parkingLotService = new ParkingLotService()

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => authStore.authToken,
      async () => {
        if (authStore.authToken != '') {
          const parkingLots = await this.parkingLotService.getParkingLots()
          runInAction(() => {
            this.parkingLots = parkingLots.data
          })
        }
      })
  }

  @action async loadParkingLots() {
    if (authStore.authToken != '') {
      const parkingLots = await this.parkingLotService.getParkingLots()
      runInAction(() => {
        this.parkingLots = parkingLots.data
        this.currentParkingLot = parkingLots.data.filter((parkingLot: ParkingLotModel) => parkingLot.id == this.currentParkingLot.id)[0]
      })
    }
  }

  @action setCurrentParkingLot(parkingLotId: number) {
    const parkingLot: ParkingLotModel = this.parkingLots.filter(el => el.id == parkingLotId)[0] || null
    runInAction(() => {
      if (parkingLot) this.currentParkingLot = parkingLot
    })
  }

  @action setParkingLots(parkingLots: ParkingLotModel[]) {
    runInAction(() => {
      this.parkingLots = parkingLots;
    })
  }

  @action setHandleData(handleData: { type: 'car' | 'user' | 'default', data: any }) {
    runInAction(() => {
      this.handleData = handleData
    })
  }
}

export const parkingLotStore = new ParkingLotStore();
