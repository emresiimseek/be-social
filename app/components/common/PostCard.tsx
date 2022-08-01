import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import { Post } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import { Props } from '../../types/common/props';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../../logic/graphql/mutations/updatePost';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import { navigate } from '../../RootNavigation';
import { PostCardItem } from '../../types/common/post-card-item';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import LottieLikeAnimation from './LottieLikeAnimation';
import { Image } from '@rneui/themed';

interface PostCardProps extends Props {
  item: PostCardItem<Post>;
  isCarousel?: boolean;
}

const PostCard = (props: PostCardProps) => {
  const [likePost, { data, loading, error }] = useMutation(UPDATE_POST);
  const [numberOfLine, setNumberOfLine] = useState<number | undefined>(1);
  const [clickCount, setClickCount] = useState(0);
  const isLiked = !!props.item.detail.post_likes.data.find(pl => +pl.id === props.currentUserId);

  const unLike = () => {
    if (!props.item) return;

    return likePost({
      variables: {
        id: props.item.id,
        data: {
          post_likes: props.item.detail.post_likes.data
            .filter(pl => +pl.id !== props.currentUserId)
            .map(pl => +pl.id),
        },
      },
    });
  };

  const like = () => {
    if (!props.item) return;

    Vibration.vibrate();
    return likePost({
      variables: {
        id: props.item.id,
        data: {
          post_likes: [props.currentUserId, ...props.item.detail.post_likes.data.map(pl => pl.id)],
        },
      },
    });
  };

  const handleLike = () => {
    props.item.detail.post_likes.data.find(pl => +pl.id === props.currentUserId);

    const result = isLiked ? unLike() : like();

    if (result && !isLiked) {
      usePushNotification({
        me: props.currentUserId ?? 0,
        related_users: [+props.item.detail.users.data[0].id],
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
        postUserId: props.item.detail.users.data[0].id,
      },
      merge: true,
    });
  };

  return props.item ? (
    <View style={props.isCarousel && { width: Dimensions.get('window').width - 20, margin: 10 }}>
      {/* Header */}
      <View style={[styles.header]}>
        <Pressable
          onPress={() =>
            navigate('VisitedProfile', {
              userId: props.item.detail.users.data[0].id,
            })
          }
          style={styles.headerContainer}
        >
          <Avatar
            size={35}
            rounded
            source={{
              uri:
                props.item?.detail.users?.data?.[0]?.attributes?.profile_photo?.data?.attributes?.url ??
                'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
            }}
          />
          <Text style={{ marginLeft: 5 }}>{props.item.detail.users?.data[0]?.attributes.username}</Text>
        </Pressable>
      </View>

      <View style={[styles.container]}>
        <Image
          style={[styles.container]}
          source={{ uri: props.item.imageUrl }}
          PlaceholderContent={<ActivityIndicator />}
        ></Image>
        <LottieLikeAnimation
          isLiked={isLiked}
          clickCount={clickCount}
          onPress={() => {
            setClickCount(clickCount + 1);
            if (clickCount % 2 === 0) {
              handleLike();
            }
          }}
        />
      </View>

      {/* Footer */}
      <View style={[styles.footer]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            onPress={() => handleLike()}
            type="metarial"
            color={
              props.item.detail.post_likes.data.find(l => +l.id === props.currentUserId) ? 'red' : 'black'
            }
            name={
              props.item.detail.post_likes.data.find(l => +l.id === props.currentUserId)
                ? 'favorite'
                : 'favorite-border'
            }
            size={20}
            style={{ marginRight: 10 }}
          />
          <Icon onPress={() => directToCommentPage()} type="font-awesome-5" name="comment" size={18} />
          {props.children}
        </View>

        {props.item.detail.comments.data.length > 0 && (
          <Pressable onPress={() => directToCommentPage()}>
            <Text style={{ fontSize: 10 }}>{props.item.detail.comments.data.length} yorumun gör...</Text>
          </Pressable>
        )}
        <TouchableOpacity
          onPress={() => {
            numberOfLine ? setNumberOfLine(undefined) : setNumberOfLine(2);
          }}
        >
          <Text style={{ marginTop: 5 }}>{props.item.description}</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
  },
  footer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 5,

    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
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
    backgroundColor: '#fff',
  },
});

export default PostCard;
