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
