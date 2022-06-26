//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Data, Item } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import { Props } from '../../types/common/props';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../../logic/graphql/queries/updatePost';
import { useEffect } from 'react';
import { useState } from 'react';

interface PostCardProps extends Props {
  item: Data<Post>;
}

// create a component
const PostCard = (props: PostCardProps) => {
  const [likePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const [post, setPost] = useState<Data<Post>>();

  useEffect(() => {
    if (data?.updatePost?.data) {
      setPost(data.updatePost.data);
    }
  }, [data]);

  useEffect(() => {
    setPost(props.item);
  }, []);

  return post ? (
    <ImageBackground
      borderRadius={5}
      style={styles.container}
      source={{ uri: post.attributes.images.data[0].attributes.url }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Avatar
          size={30}
          rounded
          source={{
            uri:
              post.attributes.users.data[0].attributes.profile_photo.data.attributes.url ??
              'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
          }}
        />
        <Text style={{ marginLeft: 5 }}>{post.attributes.users.data[0].attributes.username}</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Icon
            onPress={() => {
              likePost({
                variables: {
                  id: post.id,
                  data: {
                    post_likes: [props.currentUserId, ...post.attributes.post_likes.data.map(pl => pl.id)],
                  },
                },
              });
            }}
            type="metarial"
            color={post.attributes.post_likes.data.find(l => +l.id === props.currentUserId) ? 'red' : 'black'}
            name={
              post.attributes.post_likes.data.find(l => +l.id === props.currentUserId)
                ? 'favorite'
                : 'favorite-border'
            }
            size={20}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Icon
              onPress={() => {
                props.navigation.navigate({
                  name: 'Comments',
                  params: { postId: props.item.id, currentUserId: props.currentUserId },
                  merge: true,
                });
              }}
              type="font-awesome-5"
              name="comment"
              size={20}
            />
          </View>
        </View>
        <Text>{post.attributes.description}</Text>
      </View>
    </ImageBackground>
  ) : null;
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
