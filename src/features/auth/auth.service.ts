import { AuthModel } from './auth.model';
import { LoginFormData } from './login.form';
import { Service } from '@features/app/http-service';

export class AuthService {
  private httpService = new Service('Auth')
  constructor() { }

  async login(data: LoginFormData): Promise<{
    isLoading: boolean;
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    return await this.httpService.post<AuthModel>('login', AuthModel, { ...data }, '');
  }
}
