import { gql } from '@apollo/client';

export const LIKE_EVENT = gql`
  mutation Like($id: ID!, $data: EventInput!) {
    updateEvent(id: $id, data: $data) {
      data {
        id
        attributes {
          event_likes {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;
