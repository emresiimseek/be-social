import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import colors from '../../styles/colors';
import { Props } from '../../types/common/props';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { EventCard } from './EventCard';
import PostCards from './PostCards';
import { Icon } from '@rneui/themed';

interface EventCardHomeProps extends Props {
  event: Data<Event>;
  userId?: number;
  onChange?: () => void;
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
          currentUserId={props.userId}
          onChange={props.onChange}
          children={dots()}
        />
        <PostCards children={dots()} posts={props.event.attributes.posts}></PostCards>
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
