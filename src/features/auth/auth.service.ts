import { Service } from '@features/app/http-service';

import { AuthModel } from './auth.model';
import { LoginFormData } from './login.form';

export class AuthService {
  private httpService = new Service('Auth')
  constructor() { }

  async login(data: LoginFormData): Promise<{
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    return await this.httpService.post<AuthModel>('/login', undefined, { ...data }, AuthModel,);
  }

  async resetPassword(data: { password: string, confirmPassword: string }, token: string): Promise<{
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    return await this.httpService.post<AuthModel>('/redefinir-minha-senha', token, { novaSenha: data.password, confirmarNovaSenha: data.confirmPassword });
  }

  async forgotPassword(cpf: string): Promise<{
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    return await this.httpService.post<AuthModel>('/esqueci-minha-senha', undefined, { cpf });
  }
}
