import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BaseComponent from '../components/common/BaseComponent';
import { getComments } from '../logic/comment';
import { StrapiArray } from '../types/strapi/base/strapi-array';
import { Comment } from '../types/strapi/comment';

export interface CommentsProps {
  route: any;
}

export interface CommentsState {
  comments: Comment[];
}

export default class CommentsComponent extends BaseComponent<CommentsProps> {
  state: CommentsState = { comments: [] };

  componentDidMount = async () => {
    const result = await getComments();

    this.setState({ comments: result.data.comments.data });
  };

  public render() {
    return (
      <View>
        <Text>{this.props.route.params.eventId} </Text>
      </View>
    );
  }
}
