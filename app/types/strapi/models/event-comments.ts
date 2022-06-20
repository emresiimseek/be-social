import { Item, Items } from '../base/base';
import { Event } from './event';

export interface Attributes2 {
  username: string;
  firstname: string;
  lastname: string;
}

export interface Attributes {
  description: string;
  event: Item<Event>;
  user_comments: Item<Attributes2>;
}

export interface EventComments {
  comments: Items<Attributes>;
}
