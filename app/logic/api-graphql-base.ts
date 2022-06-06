import axios, { CancelTokenSource } from 'axios';

class ApiGraphQlBase {
  cancelTokenSource: CancelTokenSource | null = null;
  baseUrl = 'https://quiet-retreat-10533.herokuapp.com/';
  apiToken =
    '24d633612d6d4ee6e9eeb1ad6b98db3311cb435be52f552d98714a4e0fcf20929c7e4d7765b5f932b67bd956d83dd70ba37cb4b229863606665fe923c0da2a7bb21f645867c8dd270860e66281bd1e59f4ed6fe44543d3302e5018c46cb30b1551730649f89de87f811f483a90059da6e2448a251380d59be9376f773cc50a7e';

  conduitApi = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.apiToken,
    },
  });

  postRequest = (query: string) => this.conduitApi.post('graphql', JSON.stringify({ query: query }));
}

export const apiGraphQlBase = new ApiGraphQlBase();
