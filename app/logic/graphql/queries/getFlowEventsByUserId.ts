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
          event_requests {
            data {
              id
              attributes {
                message
                status
                user {
                  data {
                    id
                  }
                }
              }
            }
          }
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
          owners {
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
          attendees {
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
