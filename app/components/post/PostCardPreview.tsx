import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import { Props } from '../../types/common/props';
import { useQuery } from '@apollo/client';
import { GET_USER_ONLY } from '../../logic/graphql/queries/getUserOnly';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { ImageInfo } from 'expo-image-picker';
import { Image } from '@rneui/themed';
import { CreatePostModel } from '../../types/common/create-post-model';

interface PostCardProps extends Props {
  item: CreatePostModel | null;
  userId: number;
  image: ImageInfo;
}

const PostCardPreview = (props: PostCardProps) => {
  const { data } = useQuery<UsersPermissionsUser>(GET_USER_ONLY, { variables: { id: props.userId } });

  const user = data?.usersPermissionsUser.data.attributes;
  const url = user?.profile_photo?.data?.attributes?.url;
  const defaultAvatarImage = 'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png';
  const uri = url ? url : defaultAvatarImage;

  return (
    <ScrollView style={{ margin: 10 }}>
      {/* Header */}
      <View style={[styles.header]}>
        <View style={styles.headerContainer}>
          <Avatar
            size={35}
            rounded
            source={{
              uri,
            }}
          />
          <Text style={{ marginLeft: 5 }}>{user?.username}</Text>
        </View>
      </View>

      <Image
        style={{
          width: '100%',
          aspectRatio: props.image.width / props.image.height,
        }}
        source={{ uri: props.image.uri }}
        PlaceholderContent={<ActivityIndicator />}
      />

      {/* Footer */}
      <View style={[styles.footer]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            type="metarial"
            color={'black'}
            name={'favorite-border'}
            size={20}
            style={{ marginRight: 10 }}
          />
          <Icon type="font-awesome-5" name="comment" size={18} />
          {props.children}
        </View>

        <Text style={{ marginTop: 5 }}>{props.item?.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default PostCardPreview;
