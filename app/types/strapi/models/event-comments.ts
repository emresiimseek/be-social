import { Item, Items } from '../base/base';

export interface Attributes2 {
  username: string;
  firstname: string;
  lastname: string;
}

export interface Attributes {
  description: string;
  user_comments: Item<Attributes2>;
}

export interface EventComments {
  comments: Items<Attributes>;
}
