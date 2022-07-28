//import liraries
import React, { Component, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Props } from '../../types/common/props';
import { Items } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import PostCard from './PostCard';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';
import { createEventCard, postCardsMapper } from '../../logic/helpers/mapper.post-card-mapper';
import { PostCardItem } from '../../types/common/post-card-item';
import { Pressable } from 'react-native';
import { View } from 'react-native';

interface PostCardProps extends Props {
  posts: Items<Post>;
  emitIndex: any;
  isFullScreen?: boolean;
  eventImageUrl?: string;
  triggerHack: boolean;
}

// create a component
const PostCards = (props: PostCardProps) => {
  const [cardItems, setCardItems] = useState<PostCardItem<Post>[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carousel, setCarousel] = useState<any>(null);

  useEffect(() => {
    carousel?.triggerRenderingHack(40);

    setTimeout(() => {
      carousel?.triggerRenderingHack(-40);
    }, 1000);
  }, [props.triggerHack]);

  useEffect(() => {
    const items = postCardsMapper(props.posts);
    const eventCardItem = createEventCard(props.eventImageUrl ?? '');
    items.unshift(eventCardItem);
    setCardItems(items);
  }, []);

  return (
    <>
      <Carousel
        ref={c => setCarousel(c)}
        loop={false}
        data={cardItems}
        sliderWidth={Dimensions.get('window').width - 20}
        itemWidth={Dimensions.get('window').width - 20}
        renderItem={item => (
          <PostCard
            index={item.index}
            item={item.item}
            currentUserId={props.currentUserId}
            currentIndex={currentIndex}
          />
        )}
        onSnapToItem={index => {
          setCurrentIndex(index);
          props.emitIndex(index);
        }}
      />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 10, zIndex: 1 }}>
        <Pagination
          dotsLength={cardItems.length}
          activeDotIndex={currentIndex}
          carouselRef={carousel}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.7}
        />
      </View>
    </>
  );
};

export default PostCards;
