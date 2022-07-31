import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Props } from '../../types/common/props';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Icon } from '@rneui/base';
import { Pressable } from 'react-native';
import { navigate } from '../../RootNavigation';
import { Post } from '../../types/strapi/models/event';

interface GridListProps extends Props {
  items: Data<Post>[];
}

// create a component
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
            <ImageBackground
              source={{ uri: item.attributes.images.data[0].attributes.url }}
              style={{
                borderRightWidth: 1,
                borderRightColor: '#e6e6e6',
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
