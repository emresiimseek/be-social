import { Image, Item } from '../base/base';
import { Items } from '../base/base';
import { Event } from './event';
import { User } from './user';

export interface Attributes {
  events: Items<Event>;
}

export interface UserEvents {
  usersPermissionsUser: Item<Attributes>;
}

/////////////

export interface UserAttributes {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  users_follow: Items<UserAttributes>;
  users_follow_me: Items<UserAttributes>;
  owner_events: Items<Event>;
  profile_photo: Item<Image>;
}

export interface UsersPermissionsUser {
  usersPermissionsUser: Item<UserAttributes>;
}
