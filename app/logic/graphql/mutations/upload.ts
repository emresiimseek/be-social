import { gql } from '@apollo/client';

export const UPLOAD = gql`
  mutation upload($file: Upload!) {
    upload(file: $file) {
      data {
        id
      }
    }
  }
`;
