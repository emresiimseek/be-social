export interface StrapiAttributes<T> {
  id: number;
  attributes: T;
}

export interface StrapiObject<T> {
  data: StrapiAttributes<T>;
  meta: Meta;
}

export interface Meta {}
