import axios from 'axios';
import { Comment } from '../types/strapi/comment';
import { apiGraphQlBase } from './api-graphql-base';
import { getCommentsQueries } from './graphql/queries/getComments';

export const getComments = async () => {
  const result = await apiGraphQlBase.postRequest(getCommentsQueries);
  return result.data;
};
