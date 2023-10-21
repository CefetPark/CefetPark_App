import { authStore } from '@features/auth/auth.store';
import { carsStore } from '@features/cars/cars.store';
import { colorsStore } from '@features/colors/colors.store';
import { guestStore } from '@features/guest/guest.store';
import { modelsStore } from '@features/models/models.store';
import { parkingLotStore } from '@features/parking-lot';
import { pusherConnectionStore } from '@features/pusher/pusher-connection';
import { queueStore } from '@features/queue/queue.store';
import { registerStore } from '@features/register/register.store';
import { userStore } from '@features/users/users.store';

class RootStore {
  parkingLotStore = parkingLotStore;
  authStore = authStore;
  carsStore = carsStore;
  registerStore = registerStore;
  userStore = userStore;
  pusherConnectionStore = pusherConnectionStore;
  queueStore = queueStore;
  colorsStore = colorsStore;
  guestStore = guestStore;
  modelsStore = modelsStore;
}

export const rootStore = new RootStore();
