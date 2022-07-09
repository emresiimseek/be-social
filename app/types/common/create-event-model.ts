export interface CreateEventModel {
  title?: string;
  description?: string;
  users?: number[];
  eventDate?: Date;
  categories?: string[];
  publishedAt?: Date;
  images?: string[];
}
