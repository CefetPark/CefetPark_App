import { authStore } from '@features/auth/auth.store';
import { carsStore } from '@features/cars/cars.store';
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
  queueStore = queueStore
}

export const rootStore = new RootStore();
