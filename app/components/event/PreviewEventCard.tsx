import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Avatar, Image } from '@rneui/themed';
import moment from 'moment';
import 'moment/locale/tr';
import { Props } from '../../types/common/props';
import { CreateEventModel } from '../../types/common/create-event-model';
import { useQuery } from '@apollo/client';
import { GET_USER_ONLY } from '../../logic/graphql/queries/getUserOnly';
import { getItem } from '../../logic/helpers/useAsyncStorage';
import { UsersPermissionsUser } from '../../types/strapi/models/user-events';
import { ImageInfo } from 'expo-image-picker';

interface CardProps extends Props {
  item: CreateEventModel;
  categoryLabels: string[];
  image: ImageInfo;
}

export const PreviewEventCard = (props: CardProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const { data } = useQuery<UsersPermissionsUser>(GET_USER_ONLY, { variables: { id: userId } });
  const url = data?.usersPermissionsUser?.data?.attributes?.profile_photo?.data?.attributes?.url;
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
    <ScrollView>
      <View style={[styles.cardContainer]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.headerContainer}>
            <Avatar
              size={35}
              rounded
              source={{
                uri,
              }}
            />
            <Text style={{ marginLeft: 5 }}>{data?.usersPermissionsUser.data.attributes.username}</Text>
          </Pressable>
          <Text style={{ marginRight: 10 }}>{moment(props.item.eventDate).format('LLL')}</Text>
        </View>

        {/* Body */}

        <View>
          <Image
            style={{
              width: '100%',
              aspectRatio: props.image.width / props.image.height,
            }}
            source={{ uri: props.image.uri }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {props.children}

              <TouchableOpacity style={{ marginRight: 10 }}>
                <Icon type="metarial" color={'black'} name={'favorite-border'} size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon type="font-awesome-5" name="comment" size={18} />
              </TouchableOpacity>
            </View>

            {/* Right */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
              <Icon name="users" size={16} type="feather" />
              <Text style={{ fontSize: 12, marginLeft: 5 }}>0 Kişi Katılıyor</Text>
            </View>
          </View>
          <Text style={{ marginTop: 5 }}>{props.item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    margin: 10,
  },

  header: {
    minHeight: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  footer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
