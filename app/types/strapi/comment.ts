export interface Attributes2 {
  username: string;
  firstname: string;
  lastname: string;
}

export interface Data2 {
  id: string;
  attributes: Attributes2;
}

export interface UsersPermissionsUser {
  data: Data2;
}

export interface Comment {
  description: string;
  user_comments: UsersPermissionsUser;
}
