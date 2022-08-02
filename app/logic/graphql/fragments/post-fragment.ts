import { gql } from '@apollo/client';

export const POST_FIELDS = gql`
  fragment PostFields on PostEntity {
    id
    attributes {
      comments {
        data {
          id
        }
      }
      post_likes {
        data {
          id
          attributes {
            username
            firstname
            lastname
          }
        }
      }
      description
      images {
        data {
          attributes {
            url
            height
            width
          }
        }
      }
      users {
        data {
          id
          attributes {
            username
            firstname
            lastname
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
    }
  }
`;
