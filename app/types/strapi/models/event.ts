import { Image } from '../base/base';
import { Items } from '../base/base';
import { Category } from './category';
import { Comment } from './comment';

import { User } from './user';

export interface Event {
  categories: Items<Category>;
  title: string;
  description: string;
  eventDate: Date;
  comments: Items<Comment>;
  images: Items<Image>;
  users: Items<User>;
}

export interface EventData {
  events: Items<Event>;
}
