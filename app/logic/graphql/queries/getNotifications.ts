import { gql } from '@apollo/client';
import { EVENTS_FIELDS } from '../fragments/event-fragments';

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($filters: NotificationFiltersInput) {
    notifications(filters: $filters) {
      data {
        id
        attributes {
          me {
            data {
              id
              attributes {
                username
                firstname
                lastname
                profile_photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          related_users {
            data {
              id
              attributes {
                username
                firstname
                lastname
                profile_photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          event {
            data {
              id
            }
          }
          post {
            data {
              id
            }
          }
          type
          createdAt
        }
      }
    }
  }
`;
