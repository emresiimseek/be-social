import { NotificationType } from '../../common/notification-type';
import { Data, Item, Items } from '../base/base';
import { User } from './user';
import { Event, Post } from './event';

export interface CreateNotification {
  type: NotificationType;
  me: number;
  related_users: number[];
  event?: number;
  post?: string;
}

export interface Notification {
  me: Item<User>;
  related_users: Items<User>;
  event: Item<Event>;
  post: Item<Post>;
  type: NotificationType;
}
