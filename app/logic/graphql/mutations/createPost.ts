import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($data: PostInput!) {
    createPost(data: $data) {
      data {
        id
      }
    }
  }
`;
