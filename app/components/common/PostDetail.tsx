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
import { getItem } from '../../logic/helpers/useAsyncStorage';

const PostDetail = (props: Props) => {
  const { data, refetch } = useQuery(GET_POST_BY_ID, { variables: { id: props.route.params.postId } });

  const [carItem, setCarItem] = useState<any>();

  const [userId, setUserId] = useState<number | undefined>();

  useEffect(() => {
    getItem<string>('userId').then(userId => {
      if (!userId) return;
      setUserId(+userId);
    });

    if (!data) return;
    const item = cardMapper(data?.post?.data);
    setCarItem(item);
  }, [data]);

  return (
    <View style={styles.container}>
      {carItem ? <PostCard item={carItem} currentUserId={userId} /> : <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default PostDetail;
