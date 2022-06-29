//import liraries
import { Input } from '@rneui/base';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from '../components/common/DatePicker';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';
import { Event } from '../types/strapi/models/event';
import { Icon } from '@rneui/themed';
import DropdownComponent from '../components/common/Dropdown';
import { CreateEventModel } from '../types/common/create-event-model';
import { Button } from '@rneui/base';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../logic/graphql/queries/createEvent';
import { Items, Variables } from '../types/strapi/base/base';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../logic/graphql/queries/getCategories';
import { Attributes } from '../types/strapi/models/user-events';
import { Category } from '../types/strapi/models/category';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const NewEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tab Status
  const items: TabStatusItem[] = [
    { title: 'Detay', icon: { name: 'calendar-outline', type: 'ionicon', size: 20 }, isActive: true },
    { title: 'Görsel', icon: { name: 'image-outline', type: 'ionicon', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  // Current User
  const [userId, setUserId] = useState<number | undefined>();
  const [event, setEvent] = useState<CreateEventModel | null>({
    eventDate: new Date(),
    publishedAt: new Date(),
  });

  // Create Event
  useEffect(() => {
    const getUserId = async () => {
      const userId = (await AsyncStorage.getItem('userId')) ?? 0;
      setEvent({ ...event, users: [+userId] });
    };

    getUserId();
  }, []);
  const [createEvent, { data, loading, error }] = useMutation<CreateEventModel, Variables>(CREATE_EVENT);

  console.log(data);

  // Get Categories
  const {
    data: queryData,
    refetch,
    loading: gueryLoading,
  } = useQuery<{ categories: Items<Category> }>(GET_CATEGORIES);

  const categories = queryData?.categories.data.map(c => ({ value: c.id, label: c.attributes.title }));

  return (
    <View style={styles.container}>
      <TabStatus items={items} currentIndex={currentIndex} />
      {currentIndex === 0 && (
        <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
          <Input
            value={event?.title}
            onChangeText={title => setEvent({ ...event, title })}
            placeholder="Başlık"
            rightIcon={{ type: 'evilicon', name: 'pencil', color: '#C06014', size: 30 }}
            inputStyle={{ color: '#536162', fontSize: 14 }}
            placeholderTextColor="#536162"
            inputContainerStyle={{ height: 35 }}
            errorStyle={{ color: '#C06014' }}
          />
          <Input
            value={event?.description}
            onChangeText={description => setEvent({ ...event, description })}
            placeholder="Açıklama"
            inputContainerStyle={{ height: 35, marginBottom: -4 }}
            rightIcon={{ type: 'evilicon', name: 'pencil', color: '#C06014', size: 30 }}
            inputStyle={{ color: '#536162', fontSize: 14 }}
            placeholderTextColor="#536162"
            errorStyle={{ color: '#C06014' }}
          />
          <DropdownComponent
            items={categories ?? []}
            onChange={category => setEvent({ ...event, categories: [+category.value] })}
          />
          <DatePicker onChange={eventDate => setEvent({ ...event, eventDate: eventDate })} />
          <Button
            title="Gönder"
            loading={loading}
            onPress={() => {
              createEvent({ variables: { data: { ...event } } });
            }}
          />
        </View>
      )}
      {/* Direction Buttons */}
      {currentIndex < items.length - 1 && (
        <View style={{ position: 'absolute', bottom: 15, zIndex: 1, right: 10 }}>
          <Icon
            onPress={() => {
              const index = currentIndex + 1;
              setCurrentIndex(index);
            }}
            type="evilicon"
            name="arrow-right"
            size={50}
          />
        </View>
      )}
      {currentIndex > 0 && (
        <View style={{ position: 'absolute', bottom: 15, zIndex: 1, left: 10 }}>
          <Icon
            onPress={() => {
              const index = currentIndex - 1;
              setCurrentIndex(index);
            }}
            type="evilicon"
            name="arrow-left"
            size={50}
          />
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: { flex: 1 },
});

//make this component available to the app
export default NewEvent;
