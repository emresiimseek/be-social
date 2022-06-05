import { BgImageObject } from './base/strapi-image';

export interface WelcomePage {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  bg_image: BgImageObject;
}
