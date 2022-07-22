import { gql } from '@apollo/client';

export const UPDATE_EVENT_REQUEST = gql`
  mutation Update_Event_Request($id: ID!, $data: EventRequestInput!) {
    updateEventRequest(id: $id, data: $data) {
      data {
        id
        attributes {
          status
        }
      }
    }
  }
`;
