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
