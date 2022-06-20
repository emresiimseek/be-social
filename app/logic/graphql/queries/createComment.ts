import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation update($data: CommentInput!) {
    createComment(data: $data) {
      data {
        id
      }
    }
  }
`;
