import { AuthModel } from './auth.model';
import { LoginFormData } from './login.form';
import { Service } from '@features/app/http-service';

export class AuthService extends Service {
  constructor() {
    super();
  }

  async login(data: LoginFormData): Promise<{
    isLoading: boolean;
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    return await this.get('http://localhost:3000/auth', AuthModel, { data: data });
  }
}
