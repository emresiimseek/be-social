import { gql } from '@apollo/client';

export const ALL_EVENTS = gql`
  query GetEvents($filters: EventFiltersInput) {
    events(filters: $filters) {
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
          title
          likes {
            data {
              id
              attributes {
                user {
                  data {
                    id
                  }
                }
                event {
                  data {
                    id
                  }
                }
              }
            }
          }

          comments {
            data {
              id
              attributes {
                description
                user {
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
                height
                width
              }
            }
          }
          owners {
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
          attendees {
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
        }
      }
    }
  }
`;
