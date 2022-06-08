export interface Attributes2 {
  title: string;
}

export interface Datum2 {
  id: string;
  attributes: Attributes2;
}

export interface Categories {
  data: Datum2[];
}

export interface Attributes4 {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Data2 {
  id: string;
  attributes: Attributes4;
}

export interface UserComments {
  data: Data2;
}

export interface Attributes3 {
  description: string;
  user_comments: UserComments;
}

export interface Datum3 {
  id: string;
  attributes: Attributes3;
}

export interface Comments {
  data: Datum3[];
}

export interface Attributes5 {
  url: string;
}

export interface Datum4 {
  id: string;
  attributes: Attributes5;
}

export interface Images {
  data: Datum4[];
}

export interface Attributes6 {
  username: string;
}

export interface Datum5 {
  attributes: Attributes6;
}

export interface Users {
  data: Datum5[];
}

export interface Attributes {
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
  attributes: Attributes;
}

export interface Events {
  data: Datum[];
}

export interface EventData {
  events: Events;
}

export interface User {}
