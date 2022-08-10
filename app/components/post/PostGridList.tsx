import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Props } from '../../types/common/props';
import { Data } from '../../types/strapi/base/base';
import { Pressable } from 'react-native';
import { navigate } from '../../RootNavigation';
import { Post } from '../../types/strapi/models/event';
import { Image } from '@rneui/themed';

interface GridListProps extends Props {
  items: Data<Post>[];
}

const PostGridList = (props: GridListProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {props.items?.length > 0 &&
        props.items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigate('PostDetail', {
                postId: item.id,
              })
            }
          >
            <Image
              source={{ uri: item.attributes.images.data[0].attributes.url }}
              PlaceholderContent={<ActivityIndicator />}
              style={{
                borderWidth: 0.5,
                borderColor: 'white',
                minHeight: Dimensions.get('window').width / 3,
                minWidth: Dimensions.get('window').width / 3,
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
            />
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostGridList;
