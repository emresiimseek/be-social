import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
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
import backgroundColors from '../../styles/backgroundColors';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import { navigate } from '../../RootNavigation';
import EventRequestModal from './EventRequestModal';
import EventRequestStatus from './EventRequestStatus';

interface CardProps extends Props {
  item: Event;
  eventId: string;
  onChange?: () => void;
  isFullScreen?: boolean;
  currentScrollPosition?: number;
}

export const EventCard = (props: CardProps) => {
  moment.locale('tr');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isLiked = !!props.item.event_likes?.data.find(l => +l.id === props.currentUserId);
  const [likeEvent, { data, loading, error }] = useMutation<FlowEventData, Variables>(LIKE_EVENT);

  const [numberOfLine, setNumberOfLine] = useState<number | undefined>(1);

  const [hasAlert, setHasAlert] = useState<boolean>(false);

  useEffect(() => {
    if (!props.currentScrollPosition || !position?.end || !position.start || hasAlert) return;

    if (
      position.start - Dimensions.get('screen').height / 2 < props.currentScrollPosition &&
      props.currentScrollPosition <= position.end + Dimensions.get('screen').height / 3
    ) {
      setHasAlert(true);
    }
  }, [props.currentScrollPosition]);

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
        event: props.eventId,
        related_users: props.item.owners.data.map(o => +o.id),
        type: 'like_event',
      });
  };

  const [visible, setVisible] = useState(true);

  const [position, setPosition] = useState<{ start: number | undefined; end: number | undefined }>();

  return (
    <View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        setPosition({ start: layout.y, end: layout.y + layout.height });
      }}
      style={styles.cardContainer}
    >
      {/* Header */}
      {visible && (
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigate('VisitedProfile', {
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
          <Text style={{ marginRight: 10 }}>{moment(props.item.eventDate).format('LLL')}</Text>
        </View>
      )}

      {/* Body */}

      <PostCards
        emitIndex={(value: number) => {
          value > 0 ? setVisible(false) : setVisible(true);
        }}
        isFullScreen={props.isFullScreen}
        posts={props.item.posts}
        currentUserId={props.currentUserId}
        eventImageUrl={props.item?.images?.data?.[0]?.attributes?.url}
        triggerHack={hasAlert}
      />
      {/* Footer */}

      {visible && (
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Icons */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              {!props.item.owners.data.map(o => +o.id).includes(props.currentUserId ?? 0) && (
                <View style={{ marginRight: 6 }}>
                  <EventRequestStatus
                    requests={props.item.event_requests}
                    currentUserId={props.currentUserId}
                    onModal={() => setIsModalVisible(true)}
                  />
                  <EventRequestModal
                    currentUserId={props.currentUserId}
                    eventUserIds={props.item.owners.data.map(o => +o.id)}
                    eventId={+props.eventId}
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onChange={props.onChange}
                  />
                </View>
              )}

              <TouchableOpacity onPress={() => like()} style={{ marginRight: 10 }}>
                <Icon
                  type="metarial"
                  color={isLiked ? 'red' : 'black'}
                  name={isLiked ? 'favorite' : 'favorite-border'}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate({
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
              >
                <Icon type="font-awesome-5" name="comment" size={18} />
              </TouchableOpacity>
            </View>
            {/* Right */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="users" size={16} type="feather" />
              <Text style={{ fontSize: 12, marginLeft: 5 }}>
                {props.item.attendees.data.length + props.item.owners.data.length} Kişi Katılıyor
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Second Line */}
            <TouchableOpacity
              onPress={() => {
                numberOfLine ? setNumberOfLine(undefined) : setNumberOfLine(2);
              }}
            >
              <Text style={{ marginTop: 5 }} numberOfLines={numberOfLine}>
                {props.item.description}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    margin: 10,
  },

  header: {
    minHeight: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  footer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
