import { PostCardItem } from '../../types/common/post-card-item';
import { Data, Items } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';

export const cardMapper = (post: Data<Post>, index: number): PostCardItem<Post> => ({
  description: post.attributes.description,
  imageUrl: post.attributes.images.data[0].attributes.url,
  detail: post.attributes,
  id: post.id,
  index: index + 1,
});

export const postCardsMapper = (posts: Items<Post>): PostCardItem<Post>[] => {
  const cardItems = posts.data.map((post, index) => cardMapper(post, index));

  return cardItems;
};

export const createEventCard = (url: string): PostCardItem<any> => ({
  description: '',
  imageUrl: url,
  detail: null,
  id: '',
  index: 0,
});
