export interface CreateEventModel {
  title?: string;
  description?: string;
  owners?: number[];
  attendees?: number[];
  eventDate?: Date;
  categories?: string[];
  publishedAt?: Date;
  images?: string[];
}
