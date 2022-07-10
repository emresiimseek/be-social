import { gql } from '@apollo/client';
import { EVENTS_FIELDS } from '../fragments/event-fragments';

export const GET_EVENTS_BY_USER_ID = gql`
  ${EVENTS_FIELDS}

  query GetEvents($filters: EventFiltersInput, $sort: [String]) {
    events(filters: $filters, sort: $sort) {
      data {
        ...EventFields
      }
    }
  }
`;
