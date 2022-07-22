import { gql } from '@apollo/client';

export const UPLOAD = gql`
  mutation upload($file: Upload!, $ref: String, $refId: ID) {
    upload(file: $file, ref: $ref, refId: $refId) {
      data {
        id
      }
    }
  }
`;
