//import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from '../components/common/DatePicker';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';
import { Icon } from '@rneui/themed';
import { CreateEventModel } from '../types/common/create-event-model';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../logic/graphql/queries/createEvent';
import { Items, Variables } from '../types/strapi/base/base';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../logic/graphql/queries/getCategories';
import { Category } from '../types/strapi/models/category';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BsInput from '../components/common/BsInput';
import BsDropdown from '../components/common/Dropdown';
import ImagePickerComponent from '../components/common/ImagePicker';
import { EventCard } from '../components/common/EventCard';
import { User } from '../types/strapi/models/user';
import { PreviewEventCard } from '../components/common/PreviewEventCard';

// create a component
const NewEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

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
          <BsInput
            value={event?.title}
            onChangeText={title => setEvent({ ...event, title })}
            label="Başlık"
            rightIcon={{ type: 'evilicon', name: 'pencil', color: '#C06014' }}
          />

          <BsInput
            value={event?.description}
            onChangeText={description => setEvent({ ...event, description })}
            label="Açıklama"
            rightIcon={{ type: 'evilicon', name: 'pencil', color: '#C06014' }}
          />

          <DatePicker onDateChange={eventDate => setEvent({ ...event, eventDate })} />

          <BsDropdown
            items={categories ?? []}
            onChange={category => setEvent({ ...event, categories: [+category.value] })}
            dropDownLabel="Kategori"
            placeholder="Kategori Seçiniz"
          />
        </View>
      )}
      {currentIndex === 1 && (
        <>
          <ImagePickerComponent onSelect={image => setEvent({ ...event, images: [image] })} />

          {event?.images?.length && <PreviewEventCard item={event} />}
        </>
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
            color="white"
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
            color="white"
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
