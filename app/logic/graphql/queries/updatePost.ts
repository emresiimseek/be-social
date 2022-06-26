import { gql } from '@apollo/client';

export const UPDATE_POST = gql`
  mutation update($id: ID!, $data: PostInput!) {
    updatePost(id: $id, data: $data) {
      data {
        id
        attributes {
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
    }
  }
`;
