import { Image } from '../base/base';
import { Items } from '../base/base';
import { Category } from './category';
import { Comment } from './comment';

import { User } from './user';
import { UserAttributes } from './user-events';

export interface Event {
  categories: Items<Category>;
  title: string;
  description: string;
  eventDate: Date;
  comments: Items<Comment>;
  images: Items<Image>;
  users: Items<UserAttributes>;
}

export interface EventData {
  events: Items<Event>;
}
