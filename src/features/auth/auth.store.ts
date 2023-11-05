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
      const user = await authStore.getAsyncStorage('user')
      const token = await authStore.getAsyncStorage('token')
      user && token && authStore.setUserAndToken(JSON.parse(user), token.substring(1, token.length - 1))
    })
  }

  @action getToken() {
    return this.authToken
  }

  @action async login(loginFormData: LoginFormData) {
    const req = await this.authService.login(loginFormData);
    if (req.data) {
      runInAction(async () => {
        this.user = req.data.user;
        this.authToken = req.data.token;
        if (this.keepLoggedIn) {
          await this.setAsyncStorage('user', JSON.stringify(this.user))
          await this.setAsyncStorage('token', JSON.stringify(this.authToken))
        }
      })
    }
    return req
  }

  @action logout() {
    AsyncStorage.clear()
    runInAction(async () => {
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

  @action setUserAndToken(user: UserModel, token: string) {
    runInAction(() => {
      this.user = user
      this.authToken = token
    })
  }

}

export const authStore = new AuthStore();
