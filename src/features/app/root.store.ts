import { authStore } from './../auth/auth.store';
import { parkingLotStore } from './../parking-lot/parking-lot.store';

class RootStore {
  parkingLotStore = parkingLotStore;
  authStore = authStore;
}

export const rootStore = new RootStore();
