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
                height
                width
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
