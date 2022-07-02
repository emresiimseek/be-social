import { gql } from '@apollo/client';

export const UPDATE_COMMENT = gql`
  mutation update($id: ID!, $data: CommentInput!) {
    updateComment(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;
