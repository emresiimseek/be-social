export interface Attributes2 {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Datum {
  id: string;
  attributes: Attributes2;
}

export interface UsersFollow {
  data: Datum[];
}

export interface Attributes3 {
  username: string;
  lastname: string;
  firstname: string;
}

export interface Datum2 {
  id: string;
  attributes: Attributes3;
}

export interface UsersFollowMe {
  data: Datum2[];
}

export interface Datum3 {
  id: string;
}

export interface Events {
  data: Datum3[];
}

export interface Attributes {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  users_follow: UsersFollow;
  users_follow_me: UsersFollowMe;
  events: Events;
}

export interface Data2 {
  id: string;
  attributes: Attributes;
}

export interface UsersPermissionsUser {
  data: Data2;
}

export interface UserData {
  usersPermissionsUser: UsersPermissionsUser;
}
