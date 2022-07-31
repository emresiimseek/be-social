import axios, { CancelTokenSource } from 'axios';
import { AxiosResponse } from '../types/common/axios-response';
import { STRAPI_API_URL, STRAPI_TOKEN } from '@env';

class ApiBase {
  cancelTokenSource: CancelTokenSource | null = null;
  baseUrl = `${STRAPI_API_URL}/api/`;

  conduitApi = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + STRAPI_TOKEN,
    },
  });

  async postRequest<T>(
    url: string,
    value: any,
    populate?: string,
    cancelToken?: any
  ): Promise<Awaited<AxiosResponse<T>>> {
    let result: AxiosResponse<T> = { validations: [], data: null };

    if (this.cancelTokenSource != null && cancelToken) this.cancelTokenSource.cancel('request canceled');

    this.cancelTokenSource = axios.CancelToken.source();

    await this.conduitApi
      .post(url, value, {
        cancelToken: this.cancelTokenSource.token,
        params: { populate: populate ? populate : '*' },
      })
      .then(response => {
        result.data = response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('request canceled', error);
        else {
          const data = error.response.data;
          result = { validations: data.error.details.errors, error: data.error.message, data: null };
        }
      });

    this.cancelTokenSource = null;

    return result;
  }

  async getRequest<T>(url: string, populate?: string, cancelToken?: any): Promise<Awaited<AxiosResponse<T>>> {
    let result: AxiosResponse<T> = { validations: [], data: null };
    if (this.cancelTokenSource != null && cancelToken) this.cancelTokenSource.cancel('request canceled');

    this.cancelTokenSource = axios.CancelToken.source();

    await this.conduitApi
      .get(url, {
        cancelToken: this.cancelTokenSource.token,
        params: { populate: populate ? populate : '*' },
      })
      .then(response => {
        result.data = response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('request canceled', error);
        else {
          const data = error.response.data;
          result = { validations: data.error.details.errors, error: data.error.message, data: null };
        }
      });

    return result;
  }
}

export const apiBase = new ApiBase();
