import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { ListItem, Avatar } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import BaseComponent from '../components/common/BaseComponent';
import { Variables } from '../types/strapi/base/base';
import { EventComments } from '../types/strapi/models/event-comments';
import { Props } from '../types/common/props';

export default class CommentsComponent extends BaseComponent<Props> {
  EVENT_COMMENTS = gql`
    query GetComments($filters: CommentFiltersInput) {
      comments(filters: $filters) {
        data {
          id
          attributes {
            description
            user_comments {
              data {
                id
                attributes {
                  username
                  firstname
                  lastname
                }
              }
            }
          }
        }
      }
    }
  `;

  public render() {
    return (
      <Query<EventComments, Variables>
        query={this.EVENT_COMMENTS}
        variables={{ filters: { event: { id: { eq: this.props.route.params.eventId } } } }}
      >
        {({ loading, data, error }) => {
          return error?.message ? (
            <Text>{error.message}</Text>
          ) : (
            <ScrollView>
              {data?.comments.data.flatMap((comment, i) => (
                <ListItem key={i} bottomDivider>
                  <Avatar
                    source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
                    rounded
                    size={70}
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      {comment.attributes.user_comments.data.attributes.username}
                    </ListItem.Title>
                    <ListItem.Subtitle>{comment.attributes.description}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}
