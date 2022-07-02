import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation follow($userId: Int, $userIds: [Int], $follow: Boolean) {
    followUser(userId: $userId, userIds: $userIds, follow: $follow) {
      username
      users_follow {
        data {
          id
        }
      }
    }
  }
`;
