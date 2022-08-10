import { NotificationType } from '../../common/notification-type';
import { Data, Item, Items } from '../base/base';
import { User } from './user';
import { Event, Post } from './event';
import { UserAttributes } from './user-events';
import { EventRequestAttributes } from './event-request';

export interface CreateNotification {
  type: NotificationType;
  me?: number;
  related_users: number[];
  event?: string;
  post?: string;
  event_request?: string;
}

export interface Notification {
  me: Item<UserAttributes>;
  related_users: Items<User>;
  event?: Item<Event>;
  post?: Item<Post>;
  type: NotificationType;
  createdAt: string;
  event_request?: Item<EventRequestAttributes>;
}
