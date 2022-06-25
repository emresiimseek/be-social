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
        <Avatar
          size={30}
          rounded
          source={{
            uri:
              props.item.attributes.users.data[0].attributes.profile_photo.data.attributes.url ??
              'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
          }}
        />
        <Text style={{ marginLeft: 5 }}>{props.item.attributes.users.data[0].attributes.username}</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Icon
            onPress={() => {}}
            type="metarial"
            color={true ? 'red' : 'black'}
            name={true ? 'favorite' : 'favorite-border'}
            size={20}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Icon onPress={() => {}} type="font-awesome-5" name="comment" size={20} />
          </View>
        </View>
        <Text>{props.item.attributes.description}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15,
    marginTop: 'auto',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF90',
    padding: 10,
    alignItems: 'center',
    paddingRight: 15,
  },
});

//make this component available to the app
export default PostCard;
