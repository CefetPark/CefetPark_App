import { makeAutoObservable, observable, action } from 'mobx';

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }

  setParkingLots() {}

  getParkingLots() {}
}

export const profileStore = new ProfileStore();
