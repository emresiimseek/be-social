import { gql } from '@apollo/client';

export const GET_USER_ONLY = gql`
  query GetUser($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          email
          firstname
          lastname
          profile_photo {
            data {
              attributes {
                url
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
