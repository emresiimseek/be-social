import { gql } from '@apollo/client';

export const SEARCH_POSTS = gql`
  query SearchPosts($filters: PostFiltersInput) {
    posts(filters: $filters) {
      data {
        id
        attributes {
          description
          images {
            data {
              id
              attributes {
                url
              }
            }
          }
          users {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
