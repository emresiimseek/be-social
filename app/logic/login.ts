import { AutResponse } from '../types/strapi/aut-response';
import { apiBase } from './api-base';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (identifier: string, password: string) => {
  const body = { identifier, password };
  const res = await apiBase.postRequest<AutResponse>('auth/local', body);

  if (res.data?.user) {
    AsyncStorage.setItem('token', JSON.stringify(res.data.jwt));

    Toast.show({
      type: 'success',
      text1: 'Başarılı',
      text2: 'Giriş Yapıldı.',
    });
  }

  return res;
};
