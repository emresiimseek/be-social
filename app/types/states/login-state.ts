import { Error2 } from '../strapi/strapi-error';

export interface LoginState {
  identifier: string;
  password: string;
  validations: Error2[];
}
