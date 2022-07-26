export interface PostCardItem<T> {
  description: string;
  imageUrl: string;
  id: string;
  detail: T;
  index: number;
}
