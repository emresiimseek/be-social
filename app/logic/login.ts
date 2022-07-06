import { apiBase } from './api-base';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutResponse } from '../types/strapi/models/aut-response';

export const login = async (identifier: string, password: string) => {
  const body = { identifier, password };
  const res = await apiBase.postRequest<AutResponse>('auth/local', body, 'user.profile_photo');

  if (res.data?.user) {
    AsyncStorage.setItem('token', JSON.stringify(res.data.jwt));
    AsyncStorage.setItem('userId', JSON.stringify(res.data.user.id));
    AsyncStorage.setItem('user', JSON.stringify(res.data.user));

    Toast.show({
      type: 'success',
      text1: 'Başarılı',
      text2: 'Giriş Yapıldı.',
    });
  }

  return res;
};
