import { gql } from '@apollo/client';

export const CREATE_EVENT_REQUEST = gql`
  mutation CreateEventRequest($data: EventRequestInput!) {
    createEventRequest(data: $data) {
      data {
        id
      }
    }
  }
`;
