import { Data, Image, Item, Items } from '../base/base';

export interface Welcome {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  bg_image: Items<Image>;
}

export interface WelcomePageModel {
  welcomePage: Item<Welcome>;
}
