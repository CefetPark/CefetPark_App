import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import { UserModel } from './auth.model';
import { AuthService } from './auth.service';
import { LoginFormData } from './login.form';

class AuthStore {
  private authService = new AuthService();
  @observable authToken = '';
  @observable user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action getToken() {
    return this.authToken
  }

  @action async login(loginFormData: LoginFormData) {
    const req = await this.authService.login(loginFormData);
    if (req.data) {
      runInAction(() => {
        this.user = req.data.user;
        this.authToken = req.data.token;
      })
    }
    return req
  }

  @action logout() {
    runInAction(() => {
      this.authToken = ''
      this.user = null
    })
  }

}

export const authStore = new AuthStore();
