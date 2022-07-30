import { EventCard } from './EventCard';
import { Props } from '../../types/common/props';
import React, { useState, useEffect } from 'react';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { Text } from '@rneui/base';
import { colors } from '../../styles/colors';
import PostCards from './PostCards';
import { Dimensions, ScrollView, View } from 'react-native';

export interface EventProps extends Props {
  isMine: boolean;
  event: Data<Event>[];
  onChange?: () => void;
  currentScrollPosition?: number;
}

export const EventList = (props: EventProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const isVisible = props.event.length > 0;

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const getCount = (event: Data<Event>) => {
    const count = () => {
      let items: number[] = [];

      event.attributes.posts.data.forEach((post, index) => {
        const width = Dimensions.get('screen').width;
        items.push(width * (index + 1));
      });
      return items;
    };

    return [0, ...count()];
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {isVisible ? (
        props.event.map((event, index) => (
          <View key={index} style={{ position: 'relative' }}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal
              onScroll={({ nativeEvent }) => {
                setCurrentIndex(nativeEvent.contentOffset.x);
              }}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <EventCard
                key={event.id}
                item={event.attributes}
                eventId={event.id}
                currentUserId={userId}
                onChange={props.onChange}
                currentScrollPosition={props.currentScrollPosition}
              />
              <PostCards posts={event.attributes.posts}></PostCards>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                top: 440,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              {getCount(event).length > 1 &&
                getCount(event).map((position, index) => (
                  <View
                    key={index}
                    style={{
                      height: 7,
                      width: 7,
                      borderRadius: 100,
                      backgroundColor: 'black',
                      marginRight: 5,
                      opacity: position === currentIndex ? 1 : 0.5,
                    }}
                  ></View>
                ))}
            </View>
          </View>
        ))
      ) : (
        <Text style={{ color: colors.textGrayColor, textAlign: 'center', padding: 10 }}>Etkinlik yok</Text>
      )}
    </>
  );
};
