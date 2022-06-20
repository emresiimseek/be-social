import { gql, useMutation, useQuery } from '@apollo/client';
import { ListItem, Avatar } from '@rneui/themed';
import { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Variables } from '../types/strapi/base/base';
import { EventComments } from '../types/strapi/models/event-comments';
import { Props } from '../types/common/props';
import { Icon, Input } from '@rneui/base';
import { EVENT_COMMENTS } from '../logic/graphql/queries/eventComments';
import { CREATE_COMMENT } from '../logic/graphql/queries/createComment';

export const CommentsComponent = (props: Props) => {
  const [bottomClass, setClass] = useState(styles.bottom);
  const [comment, setComment] = useState('');

  const [createComment, { loading, data }] = useMutation(CREATE_COMMENT);

  const {
    data: queryData,
    refetch,
    loading: queryLoading,
  } = useQuery<EventComments, Variables>(EVENT_COMMENTS, {
    variables: { filters: { event: { id: { eq: props.route.params.eventId } } } },
  });

  return (
    <Pressable style={{ flex: 1 }} onPress={() => setClass(styles.bottom)}>
      <ScrollView
        style={{ flex: 0.9 }}
        refreshControl={
          <RefreshControl
            refreshing={loading || queryLoading}
            onRefresh={async () => {
              const result = await refetch();
            }}
          />
        }
      >
        {queryData?.comments.data.flatMap((comment, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() =>
              props.navigation.navigate('VisitedProfile', {
                userId: comment.attributes.user_comments.data.id,
              })
            }
          >
            <Avatar source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} rounded size={70} />
            <ListItem.Content>
              <ListItem.Title>{comment.attributes.user_comments.data.attributes.username}</ListItem.Title>
              <ListItem.Subtitle>{comment.attributes.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>

      <View style={bottomClass}>
        <Input
          value={comment}
          onChangeText={text => setComment(text)}
          onTouchStart={() => setClass(styles.bottomFocus)}
          style={{ color: 'white' }}
        />
        <Icon
          type="metrial"
          name="send"
          color={'white'}
          onPress={async () => {
            await createComment({
              variables: {
                data: {
                  description: comment,
                  event: props.route.params.eventId,
                  user_comments: props.route.params.currentUserId,
                  publishedAt: new Date(),
                },
              },
            });
            await refetch();
            setComment('');
            setClass(styles.bottom);
          }}
        />
      </View>
    </Pressable>
  );
};

// define your stylesr
const styles = StyleSheet.create({
  bottom: {
    flex: 0.1,
    flexDirection: 'row',
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  bottomFocus: {
    flex: 0.2,
    flexDirection: 'row',
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
