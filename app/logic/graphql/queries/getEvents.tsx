import { gql } from '@apollo/client';
export const GET_EVENTS = gql`
  query GetEvents($filters: EventFiltersInput) {
    events(filters: $filters) {
      data {
        id
        attributes {
          title
          description
        }
      }
    }
  }
`;
