import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClazzOrModelSchema, deserialize } from 'serializr';

import { Env } from '../../../env';

export interface ReqReturn {
  error: { statusError: number; errorMessage: string } | null;
  data: any;
}

export class Service {
  private error: { statusError: number; errorMessage: string } | null = null;
  private data: any = null;
  private baseUrl: string = Env.baseUrl;
  private axios: Axios

  constructor(module: string | null) {
    this.baseUrl = module ? `${this.baseUrl}${module}` : this.baseUrl
    this.axios = axios.create()
  }

  async post<T>(
    url: string,
    authToken?: string,
    data?: any,
    modelSchema?: ClazzOrModelSchema<T>,
  ): Promise<ReqReturn> {
    try {
      const urlFormated = url ? `${this.baseUrl}${url}` : this.baseUrl
      const headers: AxiosRequestConfig = authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}
      let response: ReqReturn = { data: null, error: { errorMessage: '', statusError: 0 } }
      await this.axios.post(urlFormated, data, headers)
        .then((res) => {
          if (modelSchema) this.data = deserialize<T>(modelSchema, res.data.data);
          else this.data = res.data;
          if (res.status > 300) {
            this.error = { statusError: res.status, errorMessage: res.statusText };
            throw new Error();
          }
          response = {
            error: this.error,
            data: this.data,
          };
        })
        .catch((erro: any) => {
          response = {
            error: { statusError: erro.response.status, errorMessage: erro.response?.data.erros[0] },
            data: null,
          };
        })

      return response
    } catch (error) {
      return {
        error: { statusError: -1, errorMessage: 'Erro ao tentar obter dados' },
        data: null,
      };
    }
  }

  async put<T>(
    url: string,
    authToken?: string,
    data?: any,
    modelSchema?: ClazzOrModelSchema<T>,
  ) {
    try {
      const urlFormated = url ? `${this.baseUrl}${url}` : this.baseUrl
      const headers: AxiosRequestConfig = authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}
      const response: AxiosResponse = await this.axios.put(urlFormated, data, headers);
      if (modelSchema) this.data = deserialize<T>(modelSchema, response.data.data);
      else this.data = response.data;

      if (response.status > 300) {
        this.error = { statusError: response.status, errorMessage: response.statusText };
        throw new Error();
      }

      return {
        error: this.error,
        data: this.data,
      };
    } catch (error: any) {
      return {
        error: { statusError: -1, errorMessage: 'Erro ao tentar obter dados' },
        data: null,
      };
    }
  }

  async get<T>(url: string,
    authToken?: string,
    modelSchema?: ClazzOrModelSchema<T>,
  ) {
    try {
      const urlFormated = url ? `${this.baseUrl}${url}` : this.baseUrl
      const headers: AxiosRequestConfig = authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}
      const response: AxiosResponse = await this.axios.get(urlFormated, headers);
      if (modelSchema) this.data = deserialize<T>(modelSchema, response.data.data);
      else this.data = response.data;

      if (response.status > 300) {
        this.error = { statusError: response.status, errorMessage: response.statusText };
        throw new Error();
      }

      return {
        error: this.error,
        data: this.data,
      };
    } catch (error: any) {
      return {
        error: { statusError: -1, errorMessage: 'Erro ao tentar obter dados' },
        data: null,
      };
    }
  }

  getList<T>(url: string,
    authToken?: string,
    modelSchema?: ClazzOrModelSchema<T>,
  ) {
    const schema = modelSchema as any
    return this.get<T[]>(url, authToken, schema ? schema : undefined,)
  }
}
