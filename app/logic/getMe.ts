import { StrapiObject } from '../types/strapi/base/strapi-object';
import { User } from '../types/strapi/strapi-user';
import { apiBase } from './api-base';

export const getMe = () =>
  apiBase.getRequest<User>('users/3', 'events.users,events.images,events.comments.users_permissions_user');
