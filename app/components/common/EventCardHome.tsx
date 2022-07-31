import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
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
}
// create a component
const EventCardHome = (props: EventCardHomeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('screen');

  const getPositionArray = () => {
    const firstPosition = 0;
    const calculatedPositions = props.event.attributes.posts.data.map((item, index) => width * (index + 1));

    return [firstPosition, ...calculatedPositions];
  };

  const dots = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
          right: 0,
          left: 0,
          zIndex: -2,
        }}
      >
        {getPositionArray().map((position, index) => (
          <View
            key={index}
            style={{
              height: 8,
              width: 8,
              borderRadius: 100,
              backgroundColor: colors.secondColor,
              marginRight: 5,
              opacity: position === currentIndex ? 1 : 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
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
    <>
      <ScrollView
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default EventCardHome;
