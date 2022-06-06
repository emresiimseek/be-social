import { CommentsFragment } from '../fragments/comment';

export const getCommentsQueries = eventId => `
query GetComments {
    ${CommentsFragment(eventId)}
  }
`;
