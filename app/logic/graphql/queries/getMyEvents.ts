import { gql } from '@apollo/client';

export const USER_EVENTS = gql`
  query getUser($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          events {
            data {
              id
              attributes {
                categories {
                  data {
                    id
                    attributes {
                      title
                    }
                  }
                }
                title
                description
                eventDate

                comments {
                  data {
                    id
                    attributes {
                      description
                      user_comments {
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
                    id
                    attributes {
                      username
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
