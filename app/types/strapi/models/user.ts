import { Event } from './event';

export interface User {
  id?: number;
  username: string;
  email: string;
  provider?: string;
  confirmed: boolean;
  blocked?: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;
  password: string;
  events?: Event[];
}

export interface RegisterUserModel extends User {
  passwordConfirmation: string;
}
