import { gql } from '@apollo/client';

export const EVENT_COMMENTS = gql`
  query GetComments($filters: CommentFiltersInput) {
    comments(filters: $filters) {
      data {
        id
        attributes {
          description
          event {
            data {
              id
              attributes {
                title
              }
            }
          }
          user_comments {
            data {
              id
              attributes {
                username
                firstname
                lastname
              }
            }
          }
        }
      }
    }
  }
`;
