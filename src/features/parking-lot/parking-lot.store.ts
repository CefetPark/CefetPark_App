import { makeAutoObservable, observable, action } from 'mobx';

export interface ParkingLot {
  id: string;
  name: string;
  availableSpots: string;
  totalParkingSpots: string;
  address: string;
}

interface QrCodeData {
  plate: string;
  name: string;
  car: string;
}

class ParkingLotStore {
  private parkingLots: ParkingLot[];
  qrCodeData: QrCodeData | null = null;

  constructor() {
    makeAutoObservable(this, {
      qrCodeData: observable,
      setParkingLots: action,
      setQrCodeData: action,
      getParkingLots: action,
    });
    this.parkingLots = [
      {
        id: '123',
        address: 'Teste de Oliveira',
        availableSpots: '10',
        name: 'Teste',
        totalParkingSpots: '20',
      },
      {
        id: '1234',
        address: 'Teste de Oliveira',
        availableSpots: '10',
        name: 'Teste2',
        totalParkingSpots: '20',
      },
      {
        id: '12345',
        address: 'Teste de Oliveira',
        availableSpots: '10',
        name: 'Teste3',
        totalParkingSpots: '20',
      },
    ];
  }

  setQrCodeData(qrCodeData: QrCodeData | null) {
    this.qrCodeData = qrCodeData;
  }

  setParkingLots(parkingLots: ParkingLot[]) {
    this.parkingLots = parkingLots;
  }

  getParkingLots() {
    return this.parkingLots;
  }
}

export const parkingLotStore = new ParkingLotStore();
