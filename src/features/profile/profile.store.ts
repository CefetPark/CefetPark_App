import { makeAutoObservable, observable, action } from 'mobx';

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const profileStore = new ProfileStore();
