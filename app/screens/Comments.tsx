import { ListItem, Avatar } from '@rneui/themed';
import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import BaseComponent from '../components/common/BaseComponent';
import { getComments } from '../logic/graphql/comment';
import { StrapiArray } from '../types/strapi/base/strapi-array';
import { Comment } from '../types/strapi/comment';
import { StrapiAttributes } from '../types/strapi/base/strapi-object';

export interface CommentsProps {
  route: any;
}

export interface CommentsState {
  comments: StrapiAttributes<Comment>[];
}

export default class CommentsComponent extends BaseComponent<CommentsProps> {
  state: CommentsState = { comments: [] };

  componentDidMount = async () => {
    const result = await getComments(this.props.route.params.eventId);

    this.setState({ comments: result.data.comments.data });
  };

  public render() {
    return (
      <ScrollView>
        {this.state.comments.flatMap((comment, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} rounded size={70} />
            <ListItem.Content>
              <ListItem.Title>{comment.attributes.user_comments.data.attributes.username}</ListItem.Title>
              <ListItem.Subtitle>{comment.attributes.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}
