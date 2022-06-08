import axios, { CancelTokenSource } from 'axios';
import { AxiosResponse } from '../types/common/axios-response';

class ApiBase {
  cancelTokenSource: CancelTokenSource | null = null;
  baseUrl = 'https://quiet-retreat-10533.herokuapp.com/api/';
  apiToken =
    '24d633612d6d4ee6e9eeb1ad6b98db3311cb435be52f552d98714a4e0fcf20929c7e4d7765b5f932b67bd956d83dd70ba37cb4b229863606665fe923c0da2a7bb21f645867c8dd270860e66281bd1e59f4ed6fe44543d3302e5018c46cb30b1551730649f89de87f811f483a90059da6e2448a251380d59be9376f773cc50a7e';

  conduitApi = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.apiToken,
    },
  });

  async postRequest<T>(url: string, value: any, cancelToken?: any): Promise<Awaited<AxiosResponse<T>>> {
    let result: AxiosResponse<T> = { validations: [], data: null };

    if (this.cancelTokenSource != null && cancelToken) this.cancelTokenSource.cancel('request canceled');

    this.cancelTokenSource = axios.CancelToken.source();

    await this.conduitApi
      .post(url, value, { cancelToken: this.cancelTokenSource.token })
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
