import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Props } from '../../types/common/props';
import { Data } from '../../types/strapi/base/base';
import { Event } from '../../types/strapi/models/event';
import { ImageBackground } from 'react-native';
import { Icon } from '@rneui/base';
import { Pressable } from 'react-native';
import { navigate } from '../../RootNavigation';
import { colors } from '../../styles/colors';
import { FlatList } from 'react-native';
import { Image } from '@rneui/themed';
import { ActivityIndicator } from 'react-native';

interface GridListProps extends Props {
  items: Data<Event>[];
}

const GridList = (props: GridListProps) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
            <>
              <Image
                source={{ uri: item.attributes.images?.data?.[0]?.attributes?.url }}
                PlaceholderContent={<ActivityIndicator />}
                style={{
                  borderWidth: 0.5,
                  borderColor: 'white',
                  minHeight: Dimensions.get('window').width / 3,
                  minWidth: Dimensions.get('window').width / 3,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 2,
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon type="ionicon" name="albums" size={25} color={colors.secondColor} />
                <Text style={{ position: 'absolute', color: 'white', fontSize: 10, paddingTop: 5 }}>
                  {item.attributes.posts.data.length}
                </Text>
              </View>
            </>
          </Pressable>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default GridList;
