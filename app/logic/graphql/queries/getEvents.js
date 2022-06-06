import { EventFragment } from '../fragments/event';

export const getEventsQueries = `
query GetEvents {
    ${EventFragment}
  }
`;
