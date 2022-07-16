import { gql } from '@apollo/client';
import { POST_FIELDS } from '../fragments/post-fragment';

export const GET_POST_BY_ID = gql`
  ${POST_FIELDS}
  query GET_POST($id: ID!) {
    post(id: $id) {
      data {
        ...PostFields
      }
    }
  }
`;
