import { gql } from '@apollo/client';

export const COMMENT_FIELDS = gql`
  fragment CommentFields on CommentEntity {
    id
    attributes {
      description
      user_comments {
        data {
          id
          attributes {
            username
            email
            firstname
            lastname
          }
        }
      }
    }
  }
`;
