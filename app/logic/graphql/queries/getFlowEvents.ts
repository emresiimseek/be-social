import { gql } from '@apollo/client';
import { EVENTS_FIELDS } from '../fragments/event-fragments';

export const USERS_QUERY = gql`
  ${EVENTS_FIELDS}

  query getFlowEvents($id: ID!) {
    flowEvents(id: $id) {
      data {
        id
        attributes {
          firstname
          profile_photo {
            data {
              id
              attributes {
                url
              }
            }
          }
          lastname
          email
          username
          users_follow {
            data {
              id
              attributes {
                username
                email
                firstname
                lastname
              }
            }
          }
          users_follow_me {
            data {
              id
              attributes {
                username
                lastname
                firstname
                lastname
              }
            }
          }
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
