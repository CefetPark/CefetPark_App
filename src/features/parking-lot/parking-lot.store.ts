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
  parkingLots: ParkingLotModel[] = [];
  currentParkingLot!: ParkingLotModel
  private parkingLotService = new ParkingLotService()
  qrCodeData: QrCodeData | null = null;

  constructor() {
    makeAutoObservable(this, {
      qrCodeData: observable,
      setParkingLots: action,
      setQrCodeData: action,
    });

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

  setCurrentParkingLot(parkingLotId: number) {
    const parkingLot: ParkingLotModel = this.parkingLots.filter(el => el.id == parkingLotId)[0] || null
    runInAction(() => {
      if (parkingLot) this.currentParkingLot = parkingLot
    })
  }

  setQrCodeData(qrCodeData: QrCodeData | null) {
    runInAction(() => {
      this.qrCodeData = qrCodeData;
    })
  }

  setParkingLots(parkingLots: ParkingLotModel[]) {
    runInAction(() => {
      this.parkingLots = parkingLots;
    })
  }
}

export const parkingLotStore = new ParkingLotStore();
