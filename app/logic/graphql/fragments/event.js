export const EventFragment = `
    events {
      data {
        id
        attributes {
          title
          description
          eventDate
          
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
                      email
                      firstname
                      lastname
                    }
                  }
                }
              }
            }
          }
          images {
            data {
              id
              attributes {
                url
              }
            }
          }
          users {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  `;
