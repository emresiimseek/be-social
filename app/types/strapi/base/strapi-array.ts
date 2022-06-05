import { StrapiAttributes } from './strapi-object';

export interface Items<T> {
  data: StrapiAttributes<T>[];
}

export interface Data<T> {
  comments: Items<T>;
}

export interface StrapiArray<T> {
  data: Data<T>;
}
