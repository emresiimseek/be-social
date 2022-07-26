//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostCard from './PostCard';
import { Props } from '../../types/common/props';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../../logic/graphql/queries/getPostById';
import Loading from './Loading';
import { useEffect } from 'react';
import { cardMapper } from '../../logic/helpers/mapper.post-card-mapper';
import { useState } from 'react';

// create a component
const PostDetail = (props: Props) => {
  const { data, refetch } = useQuery(GET_POST_BY_ID, { variables: { id: props.route.params.postId } });

  const [carItem, setCarItem] = useState<any>();

  useEffect(() => {
    if (!data) return;

    const item = cardMapper(data?.post?.data);

    setCarItem(item);
  }, [data]);

  return (
    <View style={styles.container}>
      {carItem ? (
        <PostCard currentIndex={1} isSingle item={carItem} currentUserId={props.currentUserId} />
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
