import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent($data: EventInput!) {
    createEvent(data: $data) {
      data {
        id
      }
    }
  }
`;
