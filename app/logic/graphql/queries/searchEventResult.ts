import { gql } from '@apollo/client';

export const SEARCH_EVENT_RESULT = gql`
  query Search($filters: EventFiltersInput) {
    events(filters: $filters) {
      data {
        id
        attributes {
          title
          posts {
            data {
              id
            }
          }
          description
          images {
            data {
              id
              attributes {
                url
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
