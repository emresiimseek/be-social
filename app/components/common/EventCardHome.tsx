import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import colors from '../../styles/colors';
import { Props } from '../../types/common/props';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { EventCard } from './EventCard';
import { postCardsMapper } from '../../logic/helpers/mapper.post-card-mapper';
import PostCard from './PostCard';

interface EventCardHomeProps extends Props {
  event: Data<Event>;
  onChange?: () => void;
  isCarousel?: boolean;
  currentScrollPosition?: number;
}
const EventCardHome = (props: EventCardHomeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('screen');
  const [position, setPosition] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const [hasEmitted, setHasEmitted] = useState<boolean>(false);
  const [carousel, setCarousel] = useState<ScrollView | null>();

  useEffect(() => {
    if ((!position.start && !position.end) || hasEmitted || !props.currentScrollPosition) return;

    const isHover =
      props.currentScrollPosition >= position.start - 200 &&
      position.end + 200 >= props.currentScrollPosition;

    const renderHack = () => {
      carousel?.scrollTo({ x: 50 });
      const interval = setInterval(() => {
        carousel?.scrollTo({ x: 0 });
      }, 500);

      setTimeout(() => clearInterval(interval), 501);
    };

    if (isHover || position.start === 0) {
      renderHack();
      setHasEmitted(true);
    }
  }, [props.currentScrollPosition]);

  const getPositionArray = () => {
    const firstPosition = 0;
    const calculatedPositions = props.event.attributes.posts.data.map((item, index) => width * (index + 1));

    return [firstPosition, ...calculatedPositions];
  };

  const dots = () => {
    if (getPositionArray().length <= 1) return null;
    return (
      <View style={styles.dotsContainer}>
        {getPositionArray().map((position, index) => (
          <View key={index} style={{ ...styles.dots, opacity: position === currentIndex ? 1 : 0.5 }} />
        ))}
      </View>
    );
  };

  const Posts = () => {
    const items = postCardsMapper(props.event.attributes.posts);
    return (
      <>
        {items.map((item, index) => (
          <PostCard
            isCarousel={props.isCarousel}
            children={dots()}
            key={index}
            item={item}
            currentUserId={props.currentUserId}
          />
        ))}
      </>
    );
  };

  return (
    <View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        setPosition({ start: layout.y, end: layout.y + layout.height });
      }}
    >
      <ScrollView
        ref={ref => {
          setCarousel(ref);
        }}
        automaticallyAdjustContentInsets={false}
        horizontal
        onScroll={({ nativeEvent }) => {
          setCurrentIndex(nativeEvent.contentOffset.x);
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <EventCard
          key={props.event.id}
          item={props.event.attributes}
          eventId={props.event.id}
          currentUserId={props.currentUserId}
          onChange={props.onChange}
          children={dots()}
        />
        {Posts()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },

  dots: {
    height: 8,
    width: 8,
    borderRadius: 100,
    backgroundColor: colors.secondColor,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: -2,
  },
});

export default EventCardHome;
