import axios, { CancelTokenSource } from 'axios';

class ApiGraphQlBase {
  cancelTokenSource: CancelTokenSource | null = null;
  baseUrl = 'http://localhost:1337/';
  apiToken =
    '6e923043ed30160575606485a6a21f217f50b3e1680cb1de74cac40062be4ba5fbd67cacc0535de0db6a2688cbd97589358963ec7ebb5dc73daea44074084a0d21184ec33f736bc6d1de4cfcb78fe0b45c7a95507630c3aebe37074a89bb148cf0533819e7c036b0918f3a09cd8681bc86e6b7c7f8cc26f7e6a4935b5f0d36ea';

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
