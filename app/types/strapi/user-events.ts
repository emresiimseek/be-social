export interface Categories {
  data: any[];
}

export interface Comments {
  data: any[];
}

export interface Attributes3 {
  url: string;
}

export interface Datum2 {
  id: string;
  attributes: Attributes3;
}

export interface Images {
  data: Datum2[];
}

export interface Attributes4 {
  username: string;
}

export interface Datum3 {
  attributes: Attributes4;
}

export interface Users {
  data: Datum3[];
}

export interface Attributes2 {
  categories: Categories;
  title: string;
  description: string;
  eventDate: Date;
  comments: Comments;
  images: Images;
  users: Users;
}

export interface Datum {
  id: string;
  attributes: Attributes2;
}

export interface Events {
  data: Datum[];
}

export interface Attributes {
  events: Events;
}

export interface Data2 {
  id: string;
  attributes: Attributes;
}

export interface UsersPermissionsUser {
  data: Data2;
}

export interface UserEvents {
  usersPermissionsUser: UsersPermissionsUser;
}
