export interface CreateEventModel {
  title?: string;
  description?: string;
  users?: number[];
  eventDate?: string;
  categories?: string[];
  publishedAt?: Date;
  images?: string[];
}
