//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Items } from '../../types/strapi/base/base';
import { CommentAttributes } from '../../types/strapi/models/event-comments';
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/themed';
import { Props } from '../../types/common/props';
import { useState } from 'react';
import colors from '../../styles/colors';
import { navigate } from '../../RootNavigation';

interface CommentRepliesProps extends Props {
  replies: Items<CommentAttributes>;
}

// create a component
const CommentsReplies = (props: CommentRepliesProps) => {
  const [isVisible, setVisible] = useState(false);

  return props.replies.data.length > 0 ? (
    <View>
      <View style={{ flexDirection: 'row', minWidth: '100%' }}>
        <View style={{ flex: 1 }}></View>
        <Text style={{}} onPress={() => setVisible(!isVisible)}>
          {props.replies.data.length && (
            <Text style={{ fontSize: 12 }}>
              {props.replies.data.length} cevabı {isVisible ? 'gizle' : 'gör'}
            </Text>
          )}
        </Text>
      </View>
      {isVisible &&
        props.replies.data.map((r, i) => (
          <ListItem
            bottomDivider={i != props.replies.data.length - 1}
            key={i}
            containerStyle={{ paddingHorizontal: 0 }}
          >
            <Avatar
              containerStyle={{ marginBottom: 'auto' }}
              onPress={() =>
                navigate('VisitedProfile', {
                  userId: r.attributes.user_comments.data.id,
                })
              }
              source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
              rounded
              size={35}
            />
            <View style={{ flexDirection: 'column', width: '80%' }}>
              <ListItem.Title>{r.attributes.user_comments.data.attributes.username}</ListItem.Title>
              <ListItem.Subtitle>{r.attributes.description}</ListItem.Subtitle>
            </View>
          </ListItem>
        ))}
    </View>
  ) : null;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.thirdColor,
  },
});

//make this component available to the app
export default CommentsReplies;
