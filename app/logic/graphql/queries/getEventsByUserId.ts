import { gql } from '@apollo/client';
import { COMMENT_FIELDS } from '../fragments/comment-fragment';
import { POST_FIELDS } from '../fragments/post-fragment';

export const FLOW_EVENTS = gql`
  ${COMMENT_FIELDS}
  ${POST_FIELDS}
  query Get($userId: Int!) {
    getEventsByUserId(userId: $userId) {
      data {
        id
        attributes {
          posts {
            data {
              ...PostFields
            }
          }
          categories {
            data {
              id
              attributes {
                title
              }
            }
          }
          title
          description
          eventDate

          comments {
            data {
              ...CommentFields
            }
          }
          images {
            data {
              id
              attributes {
                url
              }
            }
          }
          users {
            data {
              id
              attributes {
                username
                profile_photo {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
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
