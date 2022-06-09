import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query getUser($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          firstname
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
              id
            }
          }
        }
      }
    }
  }
`;
