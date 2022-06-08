import { User } from './user';

export interface AutResponse {
  jwt: string;
  user: User;
  loading: boolean;
}
