import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, Avatar } from '@rneui/themed';
import moment from 'moment';
import 'moment/locale/tr';
import { Props } from '../../types/common/props';
import { CreateEventModel } from '../../types/common/create-event-model';
import { useQuery } from '@apollo/client';
import { GET_USER_ONLY } from '../../logic/graphql/queries/getUserOnly';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';

interface CardProps extends Props {
  item: CreateEventModel;
  categoryLabels: string[];
}

export const PreviewEventCard = (props: CardProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const { data } = useQuery<UsersPermissionsUser>(GET_USER_ONLY, { variables: { id: userId } });
  const url = data?.usersPermissionsUser.data.attributes.profile_photo.data.attributes.url;
  const defaultAvatarImage = 'https://www.pngkey.com/png/full/114-1149847_avatar-unknown-dp.png';
  const uri = url ? url : defaultAvatarImage;

  moment.locale('tr');

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.headerContainer}>
          {data?.usersPermissionsUser && (
            <Avatar
              size={35}
              rounded
              source={{
                uri,
              }}
            />
          )}

          <Text style={{ marginLeft: 5 }}>emresimsek</Text>
        </Pressable>

        <Icon name="ellipsis-v" style={{ marginRight: 10 }} type="font-awesome-5" color="gray" size={15} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          imageStyle={{ backgroundColor: 'gray' }}
          source={{ uri: props.item.images?.[0] ?? '' }}
        />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Icons */}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Icon type="metarial" name="favorite-border" size={20} />
            <View style={{ marginHorizontal: 10 }}>
              <Icon type="font-awesome-5" name="comment" size={18} />
            </View>

            {/* <Icon name="paper-plane-o" type="font-awesome" size={20} /> */}
          </View>
          {/* Right */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="groups" type="metarial" size={25} />
            <Text style={{ fontSize: 12, marginLeft: 5 }}>{1} Kişi Katılıyor</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          {/* First Line */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }}>{props.item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> {moment(props.item.eventDate).format('LLL')} </Text>
              <Icon name="calendar" type="ant-design" style={{ marginLeft: 5 }} />
            </View>
          </View>

          {/* Second Line */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>{props.item.description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{props.categoryLabels?.map(c => c)}</Text>
              <Icon name="tagso" type="ant-design" style={{ marginLeft: 5 }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    minHeight: '90%',
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 1,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'column',
    padding: 10,
  },
});
