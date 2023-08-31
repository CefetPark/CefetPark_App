import { makeAutoObservable, runInAction } from 'mobx';
import { LoginFormData } from './login.form';
import { AuthService } from './auth.service';
import { UserModel } from './auth.model';

class AuthStore {
  private authService = new AuthService();
  authToken = '';
  user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getToken() {
    return this.authToken
  }

  async login(loginFormData: LoginFormData) {
    const req = await this.authService.login(loginFormData);
    if (req.data) {
      runInAction(() => {
        this.user = req.data.user;
        this.authToken = req.data.token;
      })
    }
  }

  logout() {
    runInAction(() => {
      this.authToken = ''
      this.user = null
    })
  }

}

export const authStore = new AuthStore();
