import { apiBase } from './api-base';
import { User } from '../types/strapi/models/user';

export const register = async (user: User | null) => {
  const body = { ...user };
  return apiBase.postRequest<User>('users', body);
};
