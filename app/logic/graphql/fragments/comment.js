export const CommentsFragment = eventId => `
    comments(filters: {event: {id: {eq: ${eventId}}}}) {
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
