import { apiBase } from './api-base';

export const login = (identifier: string, password: string) => {
  const body = { identifier, password };
  console.log(body);
  return apiBase.postRequest('auth/local', body);
};
