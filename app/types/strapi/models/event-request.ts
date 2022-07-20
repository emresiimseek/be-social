import { Data, Item } from '../base/base';
import { Event } from './event';
import { User } from './user';

export interface CreateEventRequest {
  message?: string;
  user?: number;
  event?: number;
  publishedAt?: Date;
  status?: 'pending' | 'accepted' | 'rejected';
}

export interface EventRequestAttributes {
  user: Item<User>;
  event: Event;
  status: 'pending' | 'accepted' | 'rejected';
}
