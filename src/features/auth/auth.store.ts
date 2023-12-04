import AsyncStorage from '@react-native-async-storage/async-storage';
import * as base64 from 'base-64';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import { UserModel } from './auth.model';
import { AuthService } from './auth.service';
import { LoginFormData } from './login.form';
import { ChangePasswordFormData } from './reset.password.form';

class AuthStore {
  private authService = new AuthService();
  @observable authToken: string | undefined = undefined;
  @observable user: UserModel | null = null;
  @observable tempToken: string = '';
  @observable isAutenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);

    runInAction(async () => {
      const user = await this.getAsyncStorage('user');
      const token = await this.getAsyncStorage('token');
      user && token && this.setUserAndToken(JSON.parse(user), token);
    });
  }

  @action getToken() {
    return this.authToken;
  }

  @action async login(loginFormData: LoginFormData) {
    const req = await this.authService.login(loginFormData);
    if (req.data) {
      runInAction(async () => {
        this.user = req.data.user;
        this.setAsyncStorage('user', JSON.stringify(this.user));
        if (req.data.user.changePassword) {
          this.tempToken = req.data.token;
        } else {
          this.setAsyncStorage('token', req.data.token);
          this.authToken = req.data.token;
        }
      });
    }
    return req;
  }

  @action logout() {
    try { AsyncStorage.clear(); }
    catch (error) { }
    runInAction(() => {
      this.authToken = '';
      this.tempToken = '';
      this.user = null;
    });
  }

  @action setAsyncStorage(key: string, value: string) {
    runInAction(async () => {
      await AsyncStorage.setItem(base64.encode(key), base64.encode(value));
    })
  }


  @action async getAsyncStorage(key: string) {
    const data = await AsyncStorage.getItem(base64.encode(key));
    return data ? base64.decode(data) : null;
  }

  @action setUserAndToken(user: UserModel, token: string) {
    runInAction(() => {
      this.user = user;
      this.authToken = token;
    });
  }

  @action async resetPassword(data: ChangePasswordFormData): Promise<boolean> {
    const res = await this.authService.resetPassword(data, this.tempToken);
    if (res.error) {
      return false;
    } else {
      await this.setAsyncStorage('token', this.tempToken);
      runInAction(() => {
        this.authToken = this.tempToken;
        this.tempToken = '';
      });
      return true;
    }
  }

  @action async forgotPassword(cpf: string): Promise<void> {
    await this.authService.forgotPassword(cpf);
  }
}

export const authStore = new AuthStore();
