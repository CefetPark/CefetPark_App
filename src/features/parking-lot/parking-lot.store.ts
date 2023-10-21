import { authStore } from '@features/auth/auth.store';
import { action, makeAutoObservable, observable, reaction, runInAction } from 'mobx';

import { ParkingLotModel } from './parking-lot.model';
import { ParkingLotService } from './parking-lot.service';
import { EntryRegister } from '@features/register/register.store';
class ParkingLotStore {
  @observable isLoading: boolean = false
  @observable parkingLots: ParkingLotModel[] = [];
  @observable currentParkingLot!: ParkingLotModel
  @observable formatedData: EntryRegister = { carId: 0, parkingLotId: 0, date: new Date(), userId: 0, driverName: '', plate: '' }
  @observable unformatedData: { type: 'car' | 'user' | 'default', data: any } = { type: 'default', data: null }
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

  @action async reloadCurrentParkingLot(parkingLotId: number) {
    const parkingLot = await this.parkingLotService.getCurrentParkingLot(parkingLotId.toString())
    if (parkingLot) {
      runInAction(() => {
        if (parkingLot.data) {
          this.parkingLots = this.parkingLots.map((el) => { return el.id == parkingLot.data.id ? parkingLot.data : el })
          this.currentParkingLot = parkingLot.data
        }
      })
      return true
    }
    return false
  }

  @action setUnformatedData(data: any, type: 'car' | 'user' | 'default') {
    runInAction(() => {
      this.unformatedData = { data, type }
    })
  }

  @action setFormatedData(data: EntryRegister) {
    runInAction(() => {
      this.formatedData = data
    })
  }

  @action resetFormatedData() {
    runInAction(() => {
      this.formatedData = { carId: 0, parkingLotId: 0, date: new Date(), userId: 0, driverName: '', plate: '' }
    })
  }
}

export const parkingLotStore = new ParkingLotStore();
