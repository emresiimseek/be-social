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
import { CREATE_COMMENT } from '../logic/graphql/mutations/createComment';
import CommentsReplies from './MyTabs/CommentReplies';
import { colors } from '../styles/colors';
import backgroundColors from '../styles/backgroundColors';

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
                buttonStyle={{ minHeight: '100%', backgroundColor: colors.firstColor }}
                icon={<Icon type="entype" name="reply" color={colors.secondColor} />}
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
                  comment.attributes?.user_comments?.data?.attributes?.profile_photo?.data?.attributes?.url ??
                  'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
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
              {/* comment replies */}
              <CommentsReplies replies={comment.attributes.replies} navigation={props.navigation} />
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
              backgroundColor: 'rgba(0,0,0,0.5)',
              flexDirection: 'row',
              borderRadius: 5,
              marginTop: 10,
              padding: 8,
            }}
          >
            <Text style={{ marginRight: 5, paddingHorizontal: 5, color: 'white' }}>
              {selectedComment?.attributes.description}
            </Text>
            <Icon
              type="metarial"
              name="close"
              size={15}
              style={{ marginLeft: 5 }}
              color={'white'}
              onPress={() => {
                setSelectedComment(null);
              }}
            />
          </View>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 25, paddingTop: 10 }}>
          <Input
            value={comment}
            containerStyle={{ height: 45 }}
            rightIcon={
              <View>
                {loading ? (
                  <Icon type="evilicon" name="spinner" size={40} color={colors.secondColor} />
                ) : (
                  <Icon
                    type="evilicon"
                    size={40}
                    name="arrow-up"
                    color={colors.secondColor}
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
                )}
              </View>
            }
            inputContainerStyle={{
              borderColor: colors.secondColor,
              borderWidth: 1,
              borderRadius: 1000,
              paddingLeft: 20,
            }}
            onChangeText={text => setComment(text)}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

// define your stylesr
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
