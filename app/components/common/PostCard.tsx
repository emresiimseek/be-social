//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Data, Item } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import { Props } from '../../types/common/props';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../../logic/graphql/mutations/updatePost';
import { useEffect } from 'react';
import { useState } from 'react';
import backgroundColors from '../../styles/backgroundColors';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import { navigate } from '../../RootNavigation';

interface PostCardProps extends Props {
  item: Data<Post>;
  emitIndex?: any;
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

  const unLike = () => {
    if (!post) return;

    return likePost({
      variables: {
        id: post.id,
        data: {
          post_likes: post.attributes.post_likes.data
            .filter(pl => +pl.id !== props.currentUserId)
            .map(pl => +pl.id),
        },
      },
    });
  };

  const like = () => {
    if (!post) return;

    return likePost({
      variables: {
        id: post.id,
        data: {
          post_likes: [props.currentUserId, ...post.attributes.post_likes.data.map(pl => pl.id)],
        },
      },
    });
  };

  const handleLike = () => {
    props.item.attributes.post_likes.data.find(pl => +pl.id === props.currentUserId);
    const isLiked = !!props.item.attributes.post_likes.data.find(pl => +pl.id === props.currentUserId);

    const result = isLiked ? unLike() : like();

    if (result && !isLiked) {
      usePushNotification({
        me: props.currentUserId ?? 0,
        related_users: [+props.item.attributes.users.data[0].id],
        post: props.item.id,
        type: 'like_post',
      });
    }
  };

  const directToCommentPage = () => {
    navigate({
      name: 'Comments',
      params: {
        postId: props.item.id,
        currentUserId: props.currentUserId,
        type: 'post',
        postUserId: props.item.attributes.users.data[0].id,
      },
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
        <Pressable
          onPress={() => navigate('VisitedProfile', { userId: props.item.attributes.users.data[0].id })}
          style={styles.header}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Avatar
              size={30}
              rounded
              source={{
                uri:
                  post.attributes?.users?.data?.[0]?.attributes?.profile_photo?.data?.attributes?.url ??
                  'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
              }}
            />
            <Text style={{ marginLeft: 5 }}>{post.attributes.users.data[0].attributes.username}</Text>
          </View>
          <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={15} />
        </Pressable>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                onPress={() => handleLike()}
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
                <Icon onPress={() => directToCommentPage()} type="font-awesome-5" name="comment" size={18} />
              </View>
            </View>
            <Text style={{ fontSize: 12 }}>{post.attributes.description}</Text>
          </View>

          {props.item.attributes.comments.data.length > 0 && (
            <Pressable onPress={() => directToCommentPage()}>
              <Text style={{ fontSize: 10 }}>
                {props.item.attributes.comments.data.length} yorumun gör...
              </Text>
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </Pressable>
  ) : null;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginRight: 20,
    aspectRatio: 1,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
    alignItems: 'center',
    padding: 15,
    marginTop: 'auto',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
    padding: 10,
    alignItems: 'center',
  },
});

//make this component available to the app
export default PostCard;
