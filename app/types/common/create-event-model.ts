export interface CreateEventModel {
  title?: string;
  description?: string;
  users?: number[];
  eventDate?: Date;
  categories?: number[];
  publishedAt?: Date;
  images?: string[];
}
