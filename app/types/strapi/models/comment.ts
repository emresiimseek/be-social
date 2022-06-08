import { Items } from '../base/base';

export interface UserCommentsAttributes {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Comment {
  description: string;
  user_comments: Items<UserCommentsAttributes>;
}
