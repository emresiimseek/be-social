import { gql } from '@apollo/client';

export const GET_WELCOME = gql`
  query GetWelcomePage {
    welcomePage {
      data {
        attributes {
          title
          description
          bg_image {
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
