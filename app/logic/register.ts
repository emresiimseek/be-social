import { AutResponse } from '../types/strapi/response/aut-response';
import { User } from '../types/strapi/strapi-user';
import { apiBase } from './api-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const register = async (user: User | null) => {
  const body = { ...user };
  console.log(body);

  const res = await apiBase.postRequest<User>('users', body);

  return res;
};
