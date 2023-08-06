import { authStore } from '@features/auth/auth.store';
import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClazzOrModelSchema, deserialize } from 'serializr';

import { Env } from '../../../env';

export class Service {
  private isLoading: boolean = false;
  private error: { statusError: number; errorMessage: string } | null = null;
  private data: any = null;
  private baseUrl: string = Env.baseUrl;
  private authToken: string | undefined
  private axios: Axios

  constructor(module: string) {
    this.baseUrl = `${this.baseUrl}${module}`
    this.axios = axios.create()
  }

  async post<T>(
    url: string,
    modelSchema?: ClazzOrModelSchema<T>,
    data?: any,
    options?: AxiosRequestConfig
  ): Promise<{
    isLoading: boolean;
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    try {
      this.isLoading = true;
      const urlFormated = url ? `${this.baseUrl}/${url}` : this.baseUrl
      const response: AxiosResponse = await this.axios.post(urlFormated, data, { headers: { Authorization: `Bearer ${authStore.authToken}` } });
      if (modelSchema) this.data = deserialize<T>(modelSchema, response.data.data);
      else this.data = response.data;

      if (response.status > 300) {
        this.error = { statusError: response.status, errorMessage: response.statusText };
        this.isLoading = false;
        throw new Error();
      }

      this.isLoading = false;
      return {
        isLoading: this.isLoading,
        error: this.error,
        data: this.data,
      };
    } catch (error: any) {
      this.isLoading = false;
      return {
        isLoading: this.isLoading,
        error: { statusError: -1, errorMessage: 'Erro ao tentar obter dados' },
        data: null,
      };
    }
  }

  async get<T>(url: string,
    modelSchema?: ClazzOrModelSchema<T>
  ): Promise<{
    isLoading: boolean;
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    this.isLoading = true;
    const urlFormated = url ? `${this.baseUrl}/${url}` : this.baseUrl
    console.log(urlFormated)
    const response: AxiosResponse = await this.axios.get(urlFormated, { headers: { Authorization: `Bearer ${authStore.authToken}` } });
    if (modelSchema) this.data = deserialize<T>(modelSchema, response.data.data);
    else this.data = response.data;

    if (response.status > 300) {
      this.error = { statusError: response.status, errorMessage: response.statusText };
      this.isLoading = false;
      throw new Error();
    }

    this.isLoading = false;
    return {
      isLoading: this.isLoading,
      error: this.error,
      data: this.data,
    };
  } catch(error: any) {
    this.isLoading = false;
    return {
      isLoading: this.isLoading,
      error: { statusError: -1, errorMessage: 'Erro ao tentar obter dados' },
      data: null,
    };
  }
}
