import React, { useState } from 'react';
import { Alert, Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, Avatar } from '@rneui/themed';
import moment from 'moment';
import 'moment/locale/tr';
import { Props } from '../../types/common/props';
import { Event } from '../../types/strapi/models/event';
import { useMutation } from '@apollo/client';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { Variables } from '../../types/strapi/base/base';
import { LIKE_EVENT } from '../../logic/graphql/mutations/likeEvent';
import PostCards from './PostCards';
import { colors } from '../../styles/colors';
import backgroundColors from '../../styles/backgroundColors';
import { usePushNotification } from '../../logic/helpers/usePushNotification';

interface CardProps extends Props {
  item: Event;
  eventId: string;
  isFullPage?: boolean;
}

export const EventCard = (props: CardProps) => {
  moment.locale('tr');

  const isLiked = !!props.item.event_likes?.data.find(l => +l.id === props.currentUserId);
  const [likeEvent, { data, loading, error }] = useMutation<FlowEventData, Variables>(LIKE_EVENT);

  const like = async () => {
    const result = await likeEvent({
      variables: {
        id: +props.eventId,
        data: {
          event_likes: isLiked
            ? [...props.item.event_likes.data.map(l => +l.id).filter(l => l !== props.currentUserId)]
            : [...props.item.event_likes.data.map(l => l.id), props.currentUserId],
        },
      },
    });

    if (result.data && !isLiked)
      usePushNotification({
        me: props.currentUserId ?? 0,
        event: +props.eventId,
        related_users: props.item.owners.data.map(o => +o.id),
        type: 'like_event',
      });
  };

  const [visible, setVisible] = useState(true);

  return (
    <View style={props.isFullPage ? styles.fullPageContainer : styles.cardContainer}>
      {/* Header */}
      {visible && (
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              props.navigation.navigate('VisitedProfile', {
                userId: props.item.owners.data[0].id,
              })
            }
            style={styles.headerContainer}
          >
            <Avatar
              size={35}
              rounded
              source={{
                uri: props.item?.owners?.data?.[0]?.attributes?.profile_photo?.data?.attributes?.url
                  ? props.item.owners.data[0].attributes.profile_photo?.data?.attributes?.url
                  : 'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
              }}
            />
            <Text style={{ marginLeft: 5 }}>{props.item?.owners?.data[0]?.attributes.username}</Text>
          </Pressable>

          <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={15} />
        </View>
      )}

      {/* Body */}

      <View style={props.isFullPage ? styles.fullPageBody : styles.body}>
        {props.item.posts?.data.length > 0 ? (
          <PostCards
            emitIndex={(value: boolean) => {
              value ? setVisible(!visible) : setVisible(value);
            }}
            posts={props.item.posts}
            currentUserId={props.currentUserId}
            navigation={props.navigation}
          />
        ) : (
          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ backgroundColor: 'gray' }}
            source={{ uri: props.item?.images?.data?.[0]?.attributes?.url }}
          />
        )}
      </View>
      {/* Footer */}

      {visible && (
        <View style={props.isFullPage ? styles.fullPageFooter : styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Icons */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon
                onPress={() => like()}
                type="metarial"
                color={isLiked ? 'red' : 'black'}
                name={isLiked ? 'favorite' : 'favorite-border'}
                size={20}
              />
              <View style={{ marginHorizontal: 10 }}>
                <Icon
                  onPress={() =>
                    props.navigation.navigate({
                      name: 'Comments',
                      params: {
                        eventId: props.eventId,
                        currentUserId: props.currentUserId,
                        type: 'event',
                        eventUserId: props.item.owners.data[0].id,
                      },
                      merge: true,
                    })
                  }
                  type="font-awesome-5"
                  name="comment"
                  size={18}
                />
              </View>

              {/* <Icon name="paper-plane-o" type="font-awesome" size={20} /> */}
            </View>
            {/* Right */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="groups" type="metarial" />
              <Text style={{ fontSize: 12, marginLeft: 5 }}>
                {props.item.attendees.data.length + props.item.owners.data.length} Kişi Katılıyor
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            {/* First Line */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', flex: 1 }}>{props.item.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text> {moment(props.item.eventDate).format('LLL')} </Text>
                <Icon name="calendar" type="ant-design" style={{ marginLeft: 5 }} />
              </View>
            </View>

            {/* Second Line */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{props.item.description}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{props.item.categories.data.map(c => c.attributes.title)}</Text>
                <Icon name="tagso" type="ant-design" style={{ marginLeft: 5 }} />
              </View>
            </View>
          </View>

          <View>
            <Text
              onPress={() =>
                props.navigation.navigate({
                  name: 'Comments',
                  params: { eventId: props.eventId, currentUserId: props.currentUserId },
                  merge: true,
                })
              }
              style={{ fontSize: 10, marginLeft: 2 }}
            >
              {props.item.comments.data.length} yorumu gör...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    minHeight: Dimensions.get('window').height / 1.5,
    borderRadius: 5,
    margin: 10,
  },
  fullPageContainer: {
    backgroundColor: 'white',
    minHeight: '100%',
    width: '100%',
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
  },
  body: {
    flex: 3,
    borderRadius: 5,
  },

  fullPageBody: {
    flex: 2,
    borderRadius: 5,
  },

  footer: {
    flexDirection: 'column',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
    padding: 10,
  },
  fullPageFooter: {
    flexDirection: 'column',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
    padding: 10,
    flex: 0.4,
  },
});
