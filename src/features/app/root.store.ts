import { userStore } from './../users/users.store';
import { registerStore } from './../register/register.store';
import { carsStore } from './../cars/cars.store';
import { authStore } from './../auth/auth.store';
import { parkingLotStore } from './../parking-lot/parking-lot.store';

class RootStore {
  parkingLotStore = parkingLotStore;
  authStore = authStore;
  carsStore = carsStore;
  registerStore = registerStore;
  userStore = userStore;
}

export const rootStore = new RootStore();
