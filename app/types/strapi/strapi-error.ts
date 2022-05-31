export interface Error2 {
  path: string[];
  message: string;
  name: string;
}

export interface Details {
  errors: Error2[];
}

export interface Error {
  status: number;
  name: string;
  message: string;
  details: Details;
}

export interface StrapiError {
  data?: Error;
  error: Error;
}
