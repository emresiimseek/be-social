import { BgImage } from '../strapi/base/strapi-image';
import { Comment } from '../strapi/comment';
import { User } from '../strapi/strapi-user';
import { BaseData, Data } from './base';

export interface EventsAttributes {
  title: string;
  description: string;
  eventDate: Date;
  comments: BaseData<Comment>;
  images: BaseData<BgImage>;
  users: BaseData<User>;
}

export interface Events {
  data: Data<EventsAttributes>[];
}

export interface EventsData {
  events: Events;
}
