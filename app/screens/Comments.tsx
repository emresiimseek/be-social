import { gql, useMutation, useQuery } from '@apollo/client';
import { ListItem, Avatar } from '@rneui/themed';
import { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Variables, Data } from '../types/strapi/base/base';
import { CommentAttributes, EventComments } from '../types/strapi/models/event-comments';
import { Props } from '../types/common/props';
import { Button, Icon, Input, Text } from '@rneui/base';
import { EVENT_COMMENTS } from '../logic/graphql/queries/eventComments';
import { CREATE_COMMENT } from '../logic/graphql/queries/createComment';
import CommentsReplies from './MyTabs/CommentReplies';

export const CommentsComponent = (props: Props) => {
  const [comment, setComment] = useState('');
  const [selectedComment, setSelectedComment] = useState<Data<CommentAttributes> | null>(null);
  const [createComment, { loading, data }] = useMutation(CREATE_COMMENT);
  const [comments, setComments] = useState<EventComments>();

  const {
    data: queryData,
    refetch,
    loading: queryLoading,
  } = useQuery<EventComments, Variables>(EVENT_COMMENTS, {
    variables: {
      filters: { event: { id: { eq: props.route.params.eventId } }, comments: { id: { eq: null } } },
    },
  });

  const {
    data: postData,
    refetch: refectPost,
    loading: queryPostLoading,
  } = useQuery<EventComments, Variables>(EVENT_COMMENTS, {
    variables: {
      filters: { post: { id: { eq: props.route.params.postId } }, comments: { id: { eq: null } } },
    },
  });

  useEffect(() => {
    if (props.route.params.postId) setComments(postData);
    else setComments(queryData);
  }, [postData, queryData]);

  return (
    <Pressable style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading || queryLoading}
            onRefresh={async () => {
              const result = await refetch();
            }}
          />
        }
      >
        {comments?.comments.data.flatMap((comment, i) => (
          <ListItem.Swipeable
            key={i}
            onPress={() => {}}
            bottomDivider
            rightContent={reset => (
              <Button
                onPress={() => {
                  setSelectedComment(comment);
                  reset();
                }}
                buttonStyle={{ minHeight: '100%', backgroundColor: '#424642' }}
                icon={<Icon type="entype" name="reply" />}
              />
            )}
          >
            <Avatar
              containerStyle={{ marginBottom: 'auto' }}
              onPress={() =>
                props.navigation.navigate('VisitedProfile', {
                  userId: comment.attributes.user_comments.data.id,
                })
              }
              source={{
                uri:
                  comment.attributes.user_comments.data.attributes.profile_photo.data.attributes.url ??
                  'https://randomuser.me/api/portraits/men/36.jpg',
              }}
              rounded
              size={35}
            />
            <ListItem.Content>
              <ListItem.Title>{comment.attributes.user_comments.data.attributes.username}</ListItem.Title>
              <ListItem.Subtitle>
                <View>
                  <Text> {comment.attributes.description}</Text>
                </View>
              </ListItem.Subtitle>
              <CommentsReplies replies={comment.attributes.replies} navigation={props.navigation} />
              {/* here */}
            </ListItem.Content>
          </ListItem.Swipeable>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bottom}
        keyboardVerticalOffset={100}
      >
        {selectedComment && (
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              borderRadius: 10,
              alignItems: 'center',
              padding: 8,
            }}
          >
            <Text style={{ marginRight: 5 }}>{selectedComment?.attributes.description}</Text>
            <Icon
              type="metarial"
              name="close"
              size={15}
              style={{ marginLeft: 5 }}
              onPress={() => {
                setSelectedComment(null);
              }}
            />
          </View>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 }}>
          <Input
            value={comment}
            containerStyle={{ height: 40 }}
            onChangeText={text => setComment(text)}
            style={{ color: 'white' }}
          />
          <Icon
            type="metrial"
            name="send"
            style={{ marginTop: 12, marginLeft: 5 }}
            color={'white'}
            onPress={async () => {
              if (selectedComment) {
                await createComment({
                  variables: {
                    data: {
                      description: comment,
                      event: props.route.params.eventId,
                      post: props.route.params.postId,
                      user_comments: props.route.params.currentUserId,
                      publishedAt: new Date(),
                      comments: [selectedComment.id],
                    },
                  },
                });
              } else {
                await createComment({
                  variables: {
                    data: {
                      description: comment,
                      event: props.route.params.eventId,
                      post: props.route.params.postId,
                      user_comments: props.route.params.currentUserId,
                      publishedAt: new Date(),
                    },
                  },
                });
              }

              await refetch();
              await refectPost();
              setComment('');
              setSelectedComment(null);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

// define your stylesr
const styles = StyleSheet.create({
  bottom: {
    paddingHorizontal: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: '#536162',
  },
});
