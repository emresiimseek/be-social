import axios from 'axios';

class ApiBase {
  cancelTokenSource = null;
  baseUrl = 'http://localhost:1337/api/';
  // baseUrl = "http://localhost:52264/api/";

  conduitApi = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async postRequest(url, value, cancelToken) {
    let result = {};

    if (this.cancelTokenSource != null && cancelToken) this.cancelTokenSource.cancel('request canceled');

    this.cancelTokenSource = axios.CancelToken.source();

    await this.conduitApi
      .post(url, value, { cancelToken: this.cancelTokenSource.token })
      .then(response => {
        result.data = response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('request canceled', error);
        } else {
          result.errors = error;
        }
      });

    this.cancelTokenSource = null;

    return result;
  }

  async getRequest(url, cancelToken) {
    let result = {};
    if (this.cancelTokenSource != null && cancelToken) this.cancelTokenSource.cancel('request canceled');

    this.cancelTokenSource = axios.CancelToken.source();

    await this.conduitApi
      .get(url, { cancelToken: this.cancelTokenSource.token })
      .then(response => {
        result.data = response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('request canceled', error);
        } else {
          result.errors = error;
        }
      });

    return result;
  }
}

export const apiBase = new ApiBase();
