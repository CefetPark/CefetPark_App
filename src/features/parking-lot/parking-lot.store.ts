import { authStore } from '@features/auth/auth.store';
import { makeAutoObservable, observable, action, reaction } from 'mobx';
import { ParkingLotModel } from './parking-lot.model';
import { ParkingLotService } from './parking-lot.service';
interface QrCodeData {
  plate: string;
  name: string;
  car: string;
}

class ParkingLotStore {
  parkingLots: ParkingLotModel[] = [];
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
        const parkingLots = await this.parkingLotService.getParkingLots()
        this.parkingLots = parkingLots.data
        console.log(this.parkingLots)
      })
  }

  setQrCodeData(qrCodeData: QrCodeData | null) {
    this.qrCodeData = qrCodeData;
  }

  setParkingLots(parkingLots: ParkingLotModel[]) {
    this.parkingLots = parkingLots;
  }
}

export const parkingLotStore = new ParkingLotStore();
