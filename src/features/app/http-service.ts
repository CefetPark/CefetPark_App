import { makeAutoObservable } from 'mobx';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { ClazzOrModelSchema, deserialize } from 'serializr';
import { Env } from '../../../env';

export class Service {
  private isLoading: boolean = false;
  private error: { statusError: number; errorMessage: string } | null = null;
  private data: any = null;
  private baseUrl: string = Env.baseUrl;

  constructor() {}

  async get<T>(
    url: string,
    modelSchema?: ClazzOrModelSchema<T>,
    options?: AxiosRequestConfig
  ): Promise<{
    isLoading: boolean;
    error: { statusError: number; errorMessage: string } | null;
    data: any;
  }> {
    const axiosInstance = axios.create();
    console.log(url);
    try {
      this.isLoading = true;
      console.log(url, options);
      const response: AxiosResponse = await axiosInstance.post(url, options);

      if (modelSchema) this.data = deserialize<T>(modelSchema, response.data);
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
      console.log(error.message);
      this.isLoading = false;
      return {
        isLoading: this.isLoading,
        error: { statusError: -1, errorMessage: 'Erro ao tentar obter dados' },
        data: null,
      };
    }
  }
}
