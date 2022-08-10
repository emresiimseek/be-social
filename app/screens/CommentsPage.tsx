import { useMutation, useQuery } from '@apollo/client';
import { ListItem, Avatar } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Variables, Data } from '../types/strapi/base/base';
import { CommentAttributes, EventComments } from '../types/strapi/models/event-comments';
import { Props } from '../types/common/props';
import { Button, Icon, Input, Text } from '@rneui/base';
import { EVENT_COMMENTS } from '../logic/graphql/queries/eventComments';
import { CREATE_COMMENT } from '../logic/graphql/mutations/createComment';
import CommentsReplies from '../components/CommentReplies';
import { colors } from '../styles/colors';
import { usePushNotification } from '../logic/helpers/usePushNotification';
import { navigate } from '../RootNavigation';

export const CommentsComponent = (props: Props) => {
  const [comment, setComment] = useState('');
  const [type, setType] = useState();
  const [selectedComment, setSelectedComment] = useState<Data<CommentAttributes> | null>(null);
  const [createComment, { loading, data }] = useMutation(CREATE_COMMENT);
  const [comments, setComments] = useState<EventComments>();

  useEffect(() => {
    setType(props.route.params.type);
  }, []);

  const {
    data: queryData,
    refetch,
    loading: queryLoading,
  } = useQuery<EventComments, Variables>(EVENT_COMMENTS, {
    variables: {
      filters: { event: { id: { eq: props.route.params.eventId } }, comments: { id: { eq: null } } },
    },
  });

  const sendComment = async () => {
    let result;

    if (selectedComment) {
      result = await createComment({
        variables: {
          data: {
            description: comment,
            event: props.route.params.eventId,
            post: props.route.params.postId,
            user: props.route.params.currentUserId,
            publishedAt: new Date(),
            comments: [selectedComment.id],
          },
        },
      });
    } else {
      result = await createComment({
        variables: {
          data: {
            description: comment,
            event: props.route.params.eventId,
            post: props.route.params.postId,
            user: props.route.params.currentUserId,
            publishedAt: new Date(),
          },
        },
      });
    }

    if (selectedComment) {
      usePushNotification({
        me: props.route.params.currentUserId,
        event: type === 'event' ? props.route.params.eventId : null,
        post: type === 'post' ? props.route.params.postId : null,
        related_users: [
          +selectedComment.attributes.user.data.id,
          type === 'post' ? +props.route.params.postUserId : +props.route.params.eventUserId,
        ],
        type: type === 'event' ? 'comment-reply_event' : 'comment-reply_post',
      });
    } else {
      usePushNotification({
        me: props.route.params.currentUserId,
        related_users: [type === 'post' ? +props.route.params.postUserId : +props.route.params.userEventId],
        type: type === 'event' ? 'comment_event' : 'comment_post',
        event: type === 'event' ? props.route.params.eventId : null,
        post: type === 'post' ? props.route.params.postId : null,
      });
    }

    await refetch();
    await refectPost();
    setComment('');
    setSelectedComment(null);
  };

  const { data: postData, refetch: refectPost } = useQuery<EventComments, Variables>(EVENT_COMMENTS, {
    variables: {
      filters: { post: { id: { eq: props.route.params.postId } }, comments: { id: { eq: null } } },
    },
  });

  useEffect(() => {
    if (props.route.params.postId) setComments(postData);
    else setComments(queryData);
  }, [postData, queryData]);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading || queryLoading} onRefresh={async () => refetch()} />
        }
      >
        {!!comments?.comments?.data?.length
          ? comments?.comments.data.flatMap((comment, i) => (
              <ListItem.Swipeable
                key={i}
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
                    navigate('VisitedProfile', {
                      userId: comment.attributes.user.data.id,
                    })
                  }
                  source={{
                    uri:
                      comment.attributes?.user?.data?.attributes?.profile_photo?.data?.attributes?.url ??
                      'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png',
                  }}
                  rounded
                  size={35}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {comment.attributes.user.data.attributes.username} {comment.attributes.user.data.id}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <View>
                      <Text> {comment.attributes.description}</Text>
                    </View>
                  </ListItem.Subtitle>
                  {/* comment replies */}
                  <CommentsReplies replies={comment.attributes.replies} />
                </ListItem.Content>
              </ListItem.Swipeable>
            ))
          : !queryLoading && (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={[styles.container, styles.bottom]}
              >
                <View>
                  <Icon type="font-awesome-5" name="comment" size={30} color={colors.secondColor} />
                  <Text style={{ textAlign: 'center', fontSize: 12, color: colors.secondColor, padding: 5 }}>
                    Hiç yorum yok.
                  </Text>
                </View>
              </KeyboardAvoidingView>
            )}
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
                    disabled={comment.length === 0}
                    disabledStyle={{ backgroundColor: 'tranparent' }}
                    size={40}
                    name="arrow-up"
                    color={comment.length > 0 ? colors.secondColor : 'rgba(0,0,0,0.5)'}
                    onPress={() => sendComment()}
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
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
});
