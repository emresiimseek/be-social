//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostCard from './PostCard';
import { Props } from '../../types/common/props';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../../logic/graphql/queries/getPostById';
import Loading from './Loading';

// create a component
const PostDetail = (props: Props) => {
  const { data, refetch } = useQuery(GET_POST_BY_ID, { variables: { id: props.route.params.postId } });
  console.log();
  const post = data?.post?.data;

  return (
    <View style={styles.container}>
      {post ? (
        <PostCard item={post} currentUserId={props.currentUserId} navigation={props.navigation} />
      ) : (
        <Loading />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});

//make this component available to the app
export default PostDetail;
