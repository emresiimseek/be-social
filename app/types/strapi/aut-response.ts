import { User } from './strapi-user';

export interface AutResponse {
  jwt: string;
  user: User;
}
