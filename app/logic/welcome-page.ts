import { apiBase } from './api-base';
import { WelcomePage } from '../types/strapi/strapi-welcome-page';
import { StrapiObject } from '../types/strapi/base/strapi-object';

export const getWelcomePage = () => apiBase.getRequest<StrapiObject<WelcomePage>>('welcome-page');
