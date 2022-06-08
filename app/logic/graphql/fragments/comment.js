export const CommentsFragment = eventId => `
    comments(filters: {event: {id: {eq: ${eventId}}}}) {
      data {
        id
        attributes {
          description
          user_comments {
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
