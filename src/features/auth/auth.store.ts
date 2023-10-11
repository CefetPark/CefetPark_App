import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import * as base64 from 'base-64'

import { UserModel } from './auth.model';
import { AuthService } from './auth.service';
import { LoginFormData } from './login.form';

class AuthStore {
  private authService = new AuthService();
  @observable authToken = '';
  @observable user: UserModel | null = null;
  @observable isAutenticated: boolean = false;
  @observable isBiometricSupported: boolean | null = null;
  @observable keepLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);

    runInAction(async () => {
      this.keepLoggedIn = Boolean(await this.getAsyncStorage('keepLoggedIn'))
    })
  }

  @action getToken() {
    return this.authToken
  }

  @action async login(loginFormData: LoginFormData) {
    if (!this.isAutenticated) await this.setAsyncStorage('login', JSON.stringify(loginFormData))
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

  @action setBiometricSupport(result: boolean) {
    runInAction(() => {
      this.isBiometricSupported = result
    })
  }

  @action setIsAutenticated(result: boolean) {
    runInAction(() => {
      this.isBiometricSupported = result
    })
  }

  @action changeKeepLoggedInState() {
    this.setAsyncStorage('keepLoggedIn', String(!this.keepLoggedIn))
    runInAction(() => {
      this.keepLoggedIn = !this.keepLoggedIn
    })
  }

  @action async setAsyncStorage(key: string, value: string) {
    await AsyncStorage.setItem(base64.encode(key), base64.encode(value))
    return true
  }

  @action async getAsyncStorage(key: string) {
    const data = await AsyncStorage.getItem(base64.encode(key))
    return data ? base64.decode(data) : null
  }

}

export const authStore = new AuthStore();
