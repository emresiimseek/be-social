import axios, { CancelTokenSource } from 'axios';
import { AxiosResponse } from '../types/common/axios-response';
import { Error2, StrapiError } from '../types/strapi/strapi-error';
// import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiBase {
  cancelTokenSource: CancelTokenSource | null = null;
  baseUrl = 'https://limitless-castle-76642.herokuapp.com/api/';

  conduitApi = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + AsyncStorage.getItem('token'),
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
          const data: StrapiError = error.response.data;
          result = { validations: data.error.details.errors, error: data.error.message, data: null };
        }
      });

    this.cancelTokenSource = null;

    return result;
  }

  async getRequest<T>(url: string, cancelToken?: any): Promise<Awaited<AxiosResponse<T>>> {
    let result: AxiosResponse<T> = { validations: [], data: null };
    if (this.cancelTokenSource != null && cancelToken) this.cancelTokenSource.cancel('request canceled');

    this.cancelTokenSource = axios.CancelToken.source();

    await this.conduitApi
      .get(url, { cancelToken: this.cancelTokenSource.token })
      .then(response => {
        result.data = response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('request canceled', error);
        else {
          const data: StrapiError = error.response.data;
          result = { validations: data.error.details.errors, error: data.error.message, data: null };
        }
      });

    return result;
  }
}

export const apiBase = new ApiBase();
