import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, Avatar } from '@rneui/themed';
import moment from 'moment';
import 'moment/locale/tr';
import { Props } from '../../types/common/props';
import { Event } from '../../types/strapi/models/event';
import { useMutation } from '@apollo/client';
import { FlowEventData } from '../../types/strapi/models/flow-event';
import { Variables } from '../../types/strapi/base/base';
import { LIKE_EVENT } from '../../logic/graphql/queries/likeEvent';

interface CardProps extends Props {
  item: Event;
  eventId: string;
}

export const EventCard = (props: CardProps) => {
  moment.locale('tr');
  const isLiked = !!props.item.event_likes?.data.find(l => +l.id === props.currentUserId);
  const [likeEvent, { data, loading, error }] = useMutation<FlowEventData, Variables>(LIKE_EVENT);

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() =>
            props.navigation.navigate('VisitedProfile', {
              userId: props.item.users.data[0].id,
            })
          }
          style={styles.headerContainer}
        >
          <Avatar
            size={35}
            rounded
            source={{
              uri: props.item.users.data[0].attributes.profile_photo?.data?.attributes?.url
                ? props.item.users.data[0].attributes.profile_photo?.data?.attributes?.url
                : 'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
            }}
          />
          <Text style={{ marginLeft: 5 }}>{props.item?.users?.data[0]?.attributes.username}</Text>
        </Pressable>

        <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={15} />
      </View>
      {/* Body */}

      <View style={styles.body}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={{ uri: props.item.images.data[0].attributes.url }}
        />
      </View>
      {/* Footer */}

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Icons */}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Icon
              onPress={() => {
                likeEvent({
                  variables: {
                    id: +props.eventId,
                    data: {
                      event_likes: isLiked
                        ? [
                            ...props.item.event_likes.data
                              .map(l => +l.id)
                              .filter(l => l !== props.currentUserId),
                          ]
                        : [...props.item.event_likes.data.map(l => l.id), props.currentUserId],
                    },
                  },
                });
              }}
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
                    params: { eventId: props.eventId, currentUserId: props.currentUserId },
                    merge: true,
                  })
                }
                type="font-awesome-5"
                name="comment"
                size={20}
              />
            </View>

            <Icon name="paper-plane-o" type="font-awesome" size={20} />
          </View>
          {/* Right */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="groups" type="metarial" size={25} />
            <Text style={{ fontSize: 12, marginLeft: 5 }}>{props.item.users.data.length} Kişi Katılıyor</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }}>{props.item.title}</Text>
            <Text style={{ flex: 1 }}>{props.item.description}</Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> {moment(props.item.eventDate).format('LLL')} </Text>
              <Icon name="calendar" type="ant-design" />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{props.item.categories.data.map(c => c.attributes.title)}</Text>
              <Icon name="tagso" type="ant-design" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: '#D3D3D3',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'column',
    minHeight: 420,
  },
  header: {
    flex: 0.25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    borderTopColor: '#D3D3D3',
  },
  footer: {
    flexDirection: 'column',
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
    padding: 10,
  },
});
