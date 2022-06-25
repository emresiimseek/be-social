//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Items } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import PostCard from './PostCard';

interface PostCardProps {
  posts: Items<Post>;
}

// create a component
const PostCards = (props: PostCardProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Carousel
        layout={'stack'}
        loop={true}
        pagingEnabled
        layoutCardOffset={18}
        data={props.posts.data}
        sliderWidth={360}
        itemWidth={360}
        renderItem={item => <PostCard item={item.item} navigation={null} />}
        onSnapToItem={index => 0}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default PostCards;