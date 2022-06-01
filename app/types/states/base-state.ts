import { Error2 } from '../strapi/strapi-error';

export interface BaseState {
  loading: boolean;
  validations: Error2[];
}
