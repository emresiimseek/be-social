import React, { Component } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Icon, Avatar } from '@rneui/themed';
import BaseComponent from './BaseComponent';
import { CardItem } from '../../types/common/card-item';
import { Event } from '../../types/strapi/strapi-event';
import moment from 'moment';
import 'moment/locale/tr';
import { Props } from '../../types/common/props';

interface CardProps extends Props {
  item: Event;
}

class Card extends BaseComponent<CardProps> {
  state = {
    item: {
      userName: 'emresimsek',
      userAvatar: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
      participantCount: 15,
    },
  };
  render() {
    moment.locale('tr');

    return (
      <View style={styles.cardContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Avatar
              size={30}
              rounded
              source={this.state.item.userAvatar ? { uri: this.state.item.userAvatar } : {}}
            />
            <Text style={{ marginLeft: 5 }}>{this.props.item.users[0].username}</Text>
          </View>

          <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={18} />
        </View>
        {/* Body */}

        <View style={styles.body}>
          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={{ uri: this.props.item.images[0].url }}
          />
        </View>
        {/* Footer */}

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Icons */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Icon type="font-awesome-5" name="heart" size={20} />
              <View style={{ marginRight: 10, marginLeft: 10 }}>
                <Icon
                  onPress={() =>
                    this.props.navigation.navigate({
                      name: 'Comments',
                      params: { eventId: this.props.item.id },
                      merge: true,
                    })
                  }
                  type="font-awesome-5"
                  name="comment"
                  size={20}
                />
              </View>

              <Icon name="paper-plane-o" type="font-awesome" size={20} />
            </View>
            {/* Right */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="groups" type="metarial" size={25} />
              <Text style={{ fontSize: 12, marginLeft: 5 }}>
                {this.props.item.users.length} Kişi Katılıyor
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', flex: 1 }}>{this.props.item.title}</Text>
              <Text style={{ flex: 1 }}>{this.props.item.description}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text> {moment(this.props.item.eventDate).format('LLL')} </Text>
                <Icon name="calendar" type="ant-design" />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Cat</Text>
                <Icon name="tagso" type="ant-design" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: '#D3D3D3',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'column',
    minHeight: 420,
  },
  header: {
    flex: 0.3,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    marginTop: 5,
    flex: 3,
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
  },
  footer: {
    flexDirection: 'column',
    borderTopColor: '#D3D3D3',
    borderTopWidth: 1,
    padding: 10,
  },
});

export default Card;
