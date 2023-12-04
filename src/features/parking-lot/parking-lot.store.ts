import { authStore } from '@features/auth/auth.store';
import { action, makeAutoObservable, observable, reaction, runInAction } from 'mobx';
import { useToast as useNativeBaseToast } from 'native-base';

import { ParkingLotModel } from './parking-lot.model';
import { ParkingLotService } from './parking-lot.service';
import { EntryRegister } from '@features/register/register.store';
import { GraphModel } from './graph.model';
import { GraphService } from './graph.service';
import { LoginTypes } from '@types';
class ParkingLotStore {
  @observable isLoading: boolean = false
  @observable parkingLots: ParkingLotModel[] = [];
  @observable currentParkingLot!: ParkingLotModel
  @observable graphData: GraphModel = { hours: [], data: [] }
  @observable formatedData: EntryRegister = { carId: 0, parkingLotId: 0, date: new Date(), userId: 0, driverName: '', plate: '' }
  @observable unformatedData: { type: 'car' | 'user' | 'default', data: any } = { type: 'default', data: null }
  private parkingLotService = new ParkingLotService()
  private graphService = new GraphService()

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => authStore.authToken,
      async () => {
        if (authStore.authToken != '') {
          const parkingLots = await this.parkingLotService.getParkingLots()
          runInAction(() => {
            if (parkingLots.error?.errorMessage) {
              authStore.logout()
            }
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
    runInAction(async () => {
      if (parkingLot) this.currentParkingLot = parkingLot
      if (authStore.user?.userType == LoginTypes.Driver) {
        console.log('entrei')
        const req = await this.graphService.getGraph(parkingLotId)
        req.data ? this.graphData = { ...req.data } : this.graphData = { data: [0, 0, 0, 0, 0, 0, 0, 0], hours: ['07H', '09H', '11H', '13H', '15H', '17H', '19H', '21H'] }
      }
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

  @action resetUnformatedData() {
    runInAction(() => {
      this.unformatedData = { type: 'default', data: null }
    })
  }

  @action setFormatedData(data: EntryRegister) {
    runInAction(() => {
      this.resetUnformatedData()
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
