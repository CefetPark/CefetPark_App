import { makeAutoObservable } from 'mobx';
import { LoginFormData } from './login.form';
import { AuthService } from './auth.service';

interface User {
  id: string;
  name: string;
  cpf: string;
  enrollment?: string;
  phoneNumber: string;
  email: string;
  role: 'Driver' | 'Security';
}

class AuthStore {
  private authService = new AuthService();
  authToken = '';
  currentUser: User;

  constructor() {
    makeAutoObservable(this);
    this.currentUser = {
      id: '123',
      name: 'Matheus Cardoso',
      cpf: '12345678900',
      email: 'email@email.com',
      phoneNumber: '40028922',
      role: 'Driver',
      enrollment: '123321',
    };
  }

  setToken() {
    this.authToken = 'driver';
  }

  setUser(user: User) {
    this.currentUser = user;
  }

  async login(loginFormData: LoginFormData) {
    console.log(loginFormData);
    const req = await this.authService.login(loginFormData);
    console.log(req);
  }
}

export const authStore = new AuthStore();
