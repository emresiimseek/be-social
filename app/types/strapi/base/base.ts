export interface Data<T> {
  id: string;
  attributes: T;
}

export interface Items<T> {
  data: Data<T>[];
}

export interface Item<T> {
  data: Data<T>;
}

export interface Image {
  url: string;
}

export interface Variables {
  filters?: any;
  sort?: string | string[];
  id?: number;
  userId?: number;
  data?: any;
  userIds?: number[];
  follow?: boolean;
}
