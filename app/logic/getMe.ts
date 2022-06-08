import { apiBase } from './api-base';
import { User } from '../types/strapi/models/user';

export const getMe = () =>
  apiBase.getRequest<User>('users/3', 'events.users,events.images,events.comments.users_permissions_user');
