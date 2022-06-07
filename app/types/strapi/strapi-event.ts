export interface Attributes3 {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Data2 {
  id: string;
  attributes: Attributes3;
}

export interface UsersPermissionsUser {
  data: Data2;
}

export interface Attributes2 {
  description: string;
  users_permissions_user: UsersPermissionsUser;
}

export interface Datum2 {
  id: string;
  attributes: Attributes2;
}

export interface Comments {
  data: Datum2[];
}

export interface Attributes4 {
  url: string;
}

export interface Datum3 {
  id: string;
  attributes: Attributes4;
}

export interface Images {
  data: Datum3[];
}

export interface Attributes5 {
  username: string;
}

export interface Datum4 {
  attributes: Attributes5;
}

export interface Users {
  data: Datum4[];
}

export interface Attributes {
  title: string;
  description: string;
  eventDate: Date;
  comments: Comments;
  images: Images;
  users: Users;
  id: string;
}

export interface Datum {
  id: string;
  attributes: Attributes;
}

export interface Events {
  data: Datum[];
}

export interface EventData {
  events: Events;
}
