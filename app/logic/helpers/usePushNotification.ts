import { Notification, CreateNotification } from '../../types/strapi/models/notification';
import { apiBase } from '../api-base';

export const usePushNotification = async (notification: CreateNotification) => {
  const body = { data: { ...notification } };
  const result = await apiBase.postRequest('notifications', body, '*');
};
