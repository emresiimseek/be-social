import { gql } from '@apollo/client';
import { EVENTS_FIELDS } from '../fragments/event-fragments';
import { POST_FIELDS } from '../fragments/post-fragment';

export const GET_NOTIFICATIONS = gql`
  ${EVENTS_FIELDS}
  ${POST_FIELDS}
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
              ...EventFields
            }
          }
          post {
            data {
              ...PostFields
            }
          }
          type
          createdAt
        }
      }
    }
  }
`;
