import { Image } from '../base/base';
import { Item, Items } from '../base/base';
import { Event } from './event';

export interface UserCommentAttributes {
  username: string;
  firstname: string;
  lastname: string;
  profile_photo: Item<Image>;
}

export interface CommentAttributes {
  description: string;
  event: Item<Event>;
  user_comments: Item<UserCommentAttributes>;
  replies: Items<CommentAttributes>;
}

export interface EventComments {
  comments: Items<CommentAttributes>;
}
