import { CommentsFragment } from '../fragments/comment';

export const getCommentsQueries = `
query GetComments {
    ${CommentsFragment}
  }
`;
