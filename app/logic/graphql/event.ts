import { apiGraphQlBase } from '../api-graphql-base';
import { getEventsQueries } from './queries/getEvents';

export const getEvents = () => apiGraphQlBase.postRequest(getEventsQueries);
