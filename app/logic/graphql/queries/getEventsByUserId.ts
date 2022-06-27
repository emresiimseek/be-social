import { gql } from '@apollo/client';

export const FLOW_EVENTS = gql`
  query Get($userId: Int!) {
    getEventsByUserId(userId: $userId) {
      data {
        id
        attributes {
          posts {
            data {
              id
              attributes {
                comments {
                  data {
                    id
                  }
                }
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
          event_likes {
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
`;
