import { apiBase } from './api-base';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutResponse } from '../types/strapi/models/aut-response';

export const login = async (identifier: string, password: string) => {
  const body = { identifier, password };
  const res = await apiBase.postRequest<AutResponse>('auth/local', body, 'user.profile_photo');

  if (res.data?.user) {
    await AsyncStorage.setItem('token', JSON.stringify(res.data.jwt));
    await AsyncStorage.setItem('userId', JSON.stringify(res.data.user.id));
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
  }

  return res;
};
