import { StrapiError, Error2 } from '../strapi/strapi-error';

export interface AxiosResponse<T> {
  data: T | null;
  validations?: Error2[];
  error?: string;
}
