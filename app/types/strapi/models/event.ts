import { Image, Item } from '../base/base';
import { Items } from '../base/base';
import { Category } from './category';
import { Comment, UserCommentsAttributes } from './comment';

import { User } from './user';
import { UserAttributes } from './user-events';

interface Like {
  username: string;
}

export interface Post {
  post_likes: Items<UserCommentsAttributes>;
  description: string;
  images: Items<Image>;
  users: Items<UserAttributes>;
  comments: Items<Comment>;
}

export interface Event {
  categories: Items<Category>;
  title: string;
  description: string;
  eventDate: Date;
  comments: Items<Comment>;
  images: Items<Image>;
  users: Items<UserAttributes>;
  event_likes: Items<Like>;
  posts: Items<Post>;
}

export interface EventData {
  events: Items<Event>;
}
