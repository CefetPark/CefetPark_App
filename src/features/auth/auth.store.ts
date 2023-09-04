import { makeAutoObservable, runInAction, observable, action } from 'mobx';
import { LoginFormData } from './login.form';
import { AuthService } from './auth.service';
import { UserModel } from './auth.model';

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
