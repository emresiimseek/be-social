//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
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
  emitIndex: any;
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

  const unLike = (post: Data<Post>) => {
    likePost({
      variables: {
        id: post.id,
        data: {
          post_likes: post.attributes.post_likes.data.filter(pl => +pl.id !== props.currentUserId),
        },
      },
    });
  };

  const like = (post: Data<Post>) => {
    likePost({
      variables: {
        id: post.id,
        data: {
          post_likes: [props.currentUserId, ...post.attributes.post_likes.data.map(pl => pl.id)],
        },
      },
    });
  };

  const directToCommentPage = () => {
    props.navigation.navigate({
      name: 'Comments',
      params: { postId: props.item.id, currentUserId: props.currentUserId },
      merge: true,
    });
  };

  return post ? (
    <Pressable onLongPress={() => props.emitIndex()}>
      <ImageBackground
        borderRadius={5}
        style={styles.container}
        source={{ uri: post.attributes.images.data[0].attributes.url }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
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
          <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={15} />
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                onPress={() => {
                  props.item.attributes.post_likes.data.find(pl => +pl.id === props.currentUserId)
                    ? unLike(post)
                    : like(post);
                }}
                type="metarial"
                color={
                  post.attributes.post_likes.data.find(l => +l.id === props.currentUserId) ? 'red' : 'black'
                }
                name={
                  post.attributes.post_likes.data.find(l => +l.id === props.currentUserId)
                    ? 'favorite'
                    : 'favorite-border'
                }
                size={20}
              />
              <View style={{ marginHorizontal: 10 }}>
                <Icon onPress={() => directToCommentPage()} type="font-awesome-5" name="comment" size={20} />
              </View>
            </View>
            <Text style={{ fontSize: 12 }}>{post.attributes.description}</Text>
          </View>

          {props.item.attributes.comments.data.length > 0 && (
            <Text style={{ fontSize: 10 }}>{props.item.attributes.comments.data.length} yorumun gör...</Text>
          )}
        </View>
      </ImageBackground>
    </Pressable>
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
    padding: 15,
    marginTop: 'auto',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF90',
    padding: 10,
    alignItems: 'center',
  },
});

//make this component available to the app
export default PostCard;
