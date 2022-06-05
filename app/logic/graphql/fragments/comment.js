export const CommentsFragment = `
    comments {
      data {
        id
        attributes {
          description
          users_permissions_user {
            data {
              id
              attributes {
                username
                firstname
                lastname
              }
            }
          }
        }
      }
    }  
`;
