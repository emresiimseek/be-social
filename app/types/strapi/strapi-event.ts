import { BgImage } from './base/strapi-image';
import { Comment } from './comment';
import { User } from './strapi-user';

export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  images: BgImage[];
  users: User[];
  comments: Comment[];
}
