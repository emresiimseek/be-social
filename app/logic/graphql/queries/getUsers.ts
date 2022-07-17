import { gql } from '@apollo/client';

export const GET_USERS_ONLY = gql`
  query GetUser($filters: UsersPermissionsUserFiltersInput) {
    usersPermissionsUsers(filters: $filters) {
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
              }
            }
          }
        }
      }
    }
  }
`;
