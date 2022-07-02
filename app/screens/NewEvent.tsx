//import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from '../components/common/DatePicker';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';
import { Icon } from '@rneui/themed';
import { CreateEventModel } from '../types/common/create-event-model';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../logic/graphql/mutations/createEvent';
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
import { getItem } from '../logic/helpers/useAsyncStorage';
import EventForm from '../components/common/EventForm';
import EventFormArrows from '../components/common/EventFormArrows';

// create a component
const NewEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<User | undefined>();

  const getUser = async () => {
    const user = await getItem<User>('user');
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Tab Status
  const items: TabStatusItem[] = [
    { title: 'Detay', icon: { name: 'calendar-outline', type: 'ionicon', size: 20 }, isActive: true },
    { title: 'Görsel', icon: { name: 'image-outline', type: 'ionicon', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  // Current User
  const [event, setEvent] = useState<CreateEventModel | null>({
    eventDate: new Date(),
    publishedAt: new Date(),
  });

  const [createEvent, { data, loading, error }] = useMutation<CreateEventModel, Variables>(CREATE_EVENT);

  // Get Categories

  const isDisabled = event?.title != '';

  return (
    <View style={styles.container}>
      <TabStatus items={items} currentIndex={currentIndex} />
      {currentIndex === 0 && (
        <EventForm
          onModelChange={newModel => {
            setEvent({ ...event, ...newModel });
          }}
          event={event}
        />
      )}

      {currentIndex === 1 && (
        <>
          <View>
            <ImagePickerComponent
              showMessage={!event?.images?.length}
              onSelect={image => setEvent({ ...event, images: [image] })}
            />
          </View>
          {event?.images?.length && <PreviewEventCard item={event} />}
        </>
      )}
      <EventFormArrows
        currentIndex={currentIndex}
        onIndexChange={index => setCurrentIndex(index)}
        itemsLength={items.length}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
});

//make this component available to the app
export default NewEvent;
