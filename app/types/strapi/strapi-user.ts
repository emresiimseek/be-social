import { Event } from './strapi-event';

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;
  password: string;
  events: Event[];
}
