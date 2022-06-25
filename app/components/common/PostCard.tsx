//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Data, Item } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import { Props } from '../../types/common/props';

interface PostCardProps extends Props {
  item: Data<Post>;
}

// create a component
const PostCard = (props: PostCardProps) => {
  return (
    <ImageBackground
      borderRadius={5}
      style={styles.container}
      source={{ uri: props.item.attributes.images.data[0].attributes.url }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ marginRight: 5 }}>{props.item.attributes.users.data[0].attributes.username}</Text>
        <Avatar
          size={30}
          rounded
          source={{
            uri:
              props.item.attributes.users.data[0].attributes.profile_photo.data.attributes.url ??
              'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
          }}
        />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{ flex: 1 }}>{props.item.attributes.description}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Icon
            onPress={() => {
              // likeEvent({
              //   variables: {
              //     id: +props.eventId,
              //     data: {
              //       event_likes: isLiked
              //         ? [
              //             ...props.item.event_likes.data
              //               .map(l => +l.id)
              //               .filter(l => l !== props.currentUserId),
              //           ]
              //         : [...props.item.event_likes.data.map(l => l.id), props.currentUserId],
              //     },
              //   },
              // });
            }}
            type="metarial"
            color={true ? 'red' : 'black'}
            name={true ? 'favorite' : 'favorite-border'}
            size={20}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Icon
              onPress={
                () => {}
                // props.navigation.navigate({
                //   name: 'Comments',
                //   params: { eventId: props.eventId, currentUserId: props.currentUserId },
                //   merge: true,
                // })
              }
              type="font-awesome-5"
              name="comment"
              size={20}
            />
          </View>

          {/* <Icon name="paper-plane-o" type="font-awesome" size={20} /> */}
        </View>
      </View>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    marginRight: 20,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF90',
    padding: 15,
    marginTop: 'auto',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF90',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
  },
});

//make this component available to the app
export default PostCard;
