import { useQuery } from '@apollo/client';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SEARCH_POSTS } from '../../logic/graphql/queries/searchPosts';
import { Items, Variables } from '../../types/strapi/base/base';
import { Post } from '../../types/strapi/models/event';
import PostGridList from './PostGridList';
import { colors } from '../../styles/colors';
import { RefreshControl } from 'react-native';

interface PostSearchProps {
  term: string;
}
// create a component
const PostSearch = (props: PostSearchProps) => {
  const { data, refetch, error, loading } = useQuery<{ posts: Items<Post> }, Variables>(SEARCH_POSTS, {
    variables: {
      filters: {
        or: [{ description: { contains: props.term } }],
      },
    },
  });

  const posts = data?.posts.data;
  const isVisible = posts && posts?.length > 0;

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={async () => refetch()} />}>
      <View style={{ flex: 1 }}>
        {isVisible ? (
          <PostGridList items={data?.posts.data} />
        ) : (
          !loading && (
            <Text style={{ textAlign: 'center', color: colors.textGrayColor, padding: 10, fontSize: 12 }}>
              Sonuç bulunmadı
            </Text>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default PostSearch;
