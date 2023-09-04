import { authStore } from '@features/auth/auth.store';
import { makeAutoObservable, observable, action, reaction, runInAction } from 'mobx';
import { ParkingLotModel } from './parking-lot.model';
import { ParkingLotService } from './parking-lot.service';
interface QrCodeData {
  parkingLotId: number;
  userId: number;
  userName: string,
  carId: number;
  plate: string,
  entryDate: Date
}
class ParkingLotStore {
  @observable isLoading: boolean = false
  @observable parkingLots: ParkingLotModel[] = [];
  @observable currentParkingLot!: ParkingLotModel
  private parkingLotService = new ParkingLotService()
  @observable qrCodeData: QrCodeData | null = null;

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

  @action setQrCodeData(qrCodeData: QrCodeData | null) {
    runInAction(() => {
      this.qrCodeData = qrCodeData;
    })
  }

  @action setParkingLots(parkingLots: ParkingLotModel[]) {
    runInAction(() => {
      this.parkingLots = parkingLots;
    })
  }
}

export const parkingLotStore = new ParkingLotStore();
