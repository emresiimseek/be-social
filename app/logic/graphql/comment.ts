import axios from 'axios';
import { Comment } from '../../types/strapi/comment';
import { apiGraphQlBase } from '../api-graphql-base';
import { getCommentsQueries } from './queries/getComments';

export const getComments = async (eventId: number) => {
  const result = await apiGraphQlBase.postRequest(getCommentsQueries(eventId));

  return result.data;
};
