import { makeAutoObservable } from 'mobx';
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

  setToken(authToken: string) {
    this.authToken = authToken;
  }

  setUser(user: UserModel) {
    this.user = user;
  }

  getToken(){
    return this.authToken
  }

  async login(loginFormData: LoginFormData) {
    const req = await this.authService.login(loginFormData);
    if(req.data) {
      this.setUser(req.data.user)
      this.setToken(req.data.token)
    }
  }
}

export const authStore = new AuthStore();
