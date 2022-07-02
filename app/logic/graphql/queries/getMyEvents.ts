import { gql } from '@apollo/client';
import { EVENTS_FIELDS } from '../fragments/event-fragments';

export const USER_EVENTS = gql`
  ${EVENTS_FIELDS}

  query getUser($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          events {
            data {
              ...EventFields
            }
          }
        }
      }
    }
  }
`;
