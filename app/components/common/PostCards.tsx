//import liraries
import React, { useState } from 'react';
import { Props } from '../../types/common/props';
import { Items } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import PostCard from './PostCard';
import { useEffect } from 'react';
import { postCardsMapper } from '../../logic/helpers/mapper.post-card-mapper';
import { PostCardItem } from '../../types/common/post-card-item';

interface PostCardProps extends Props {
  posts: Items<Post>;
}

// create a component
const PostCards = (props: PostCardProps) => {
  const [cardItems, setCardItems] = useState<PostCardItem<Post>[]>([]);

  useEffect(() => {
    const items = postCardsMapper(props.posts);
    setCardItems(items);
  }, []);

  return (
    <>
      {cardItems.map((item, index) => (
        <PostCard key={index} item={item} currentUserId={props.currentUserId} />
      ))}
    </>
  );
};

export default PostCards;
