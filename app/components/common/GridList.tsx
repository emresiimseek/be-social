//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Props } from '../../types/common/props';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Icon } from '@rneui/base';
import { Pressable } from 'react-native';
import { navigate } from '../../RootNavigation';

interface GridListProps extends Props {
  items: Data<Event>[];
}

// create a component
const GridList = (props: GridListProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {props.items?.length > 0 &&
        props.items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigate('EventDetail', {
                eventId: item.id,
              })
            }
          >
            <ImageBackground
              source={{ uri: item.attributes.images.data[0].attributes.url }}
              style={{
                borderRightWidth: 1,
                borderRightColor: '#e6e6e6',
                minHeight: Dimensions.get('window').width / 3,
                minWidth: Dimensions.get('window').width / 3,
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
            >
              <View style={{ position: 'absolute', right: 2, zIndex: 1 }}>
                <Icon type="ionicon" name="albums" size={22} />
                <Text style={{ position: 'absolute', color: 'white', fontSize: 10, right: 9, top: 9 }}>
                  {item.attributes.posts.data.length}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default GridList;
