import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import { Props } from '../../types/common/props';
import { useState } from 'react';
import backgroundColors from '../../styles/backgroundColors';
import { CreatePostModel } from '../../types/common/create-post-model';
import { useQuery } from '@apollo/client';
import { GET_USER_ONLY } from '../../logic/graphql/queries/getUserOnly';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';

interface PostCardProps extends Props {
  item: CreatePostModel | null;
  userId: number;
  image: string;
}

// create a component
const PostCardPreview = (props: PostCardProps) => {
  const { data } = useQuery<UsersPermissionsUser>(GET_USER_ONLY, { variables: { id: props.userId } });

  const user = data?.usersPermissionsUser.data.attributes;
  const url = user?.profile_photo?.data?.attributes?.url;
  const defaultAvatarImage = 'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png';
  const uri = url ? url : defaultAvatarImage;

  return props.item ? (
    <View style={{ marginBottom: 10, marginHorizontal: 10, flex: 1, justifyContent: 'center' }}>
      <ImageBackground borderRadius={5} style={styles.container} source={{ uri: props.image }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Avatar
              size={30}
              rounded
              source={{
                uri: uri,
              }}
            />
            <Text style={{ marginLeft: 5 }}> {user?.username}</Text>
          </View>
          <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={15} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon type="metarial" color="black" name="favorite-border" size={20} />
              <View style={{ marginHorizontal: 10 }}>
                <Icon type="font-awesome-5" name="comment" size={18} />
              </View>
            </View>
            <Text style={{ fontSize: 12 }}>{props.item.description}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
    alignItems: 'center',
    marginTop: 'auto',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: backgroundColors.cardBackgroundColorOpacity,
    padding: 10,
    alignItems: 'center',
  },
});

export default PostCardPreview;
