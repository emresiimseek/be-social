import { apiBase } from './api-base';

export const login = (identifier, password) => {
  const body = { identifier: identifier, password: password };
  console.log(body);
  return apiBase.postRequest('auth/local', { identifier: identifier, password: password });
};
