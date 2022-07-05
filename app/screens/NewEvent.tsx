//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';
import { CreateEventModel } from '../types/common/create-event-model';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../logic/graphql/mutations/createEvent';
import { Variables } from '../types/strapi/base/base';
import { useEffect } from 'react';
import { User } from '../types/strapi/models/user';
import { getItem } from '../logic/helpers/useAsyncStorage';
import EventForm from '../components/common/EventForm';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import NewEventImageSection from '../components/common/NewEventImageSection';
import { Props } from '../types/common/props';
import { Button } from '@rneui/base';
import { colors } from '../styles/colors';
import { color } from '@rneui/base';

// create a component
const NewEvent = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createLoading, setLoading] = useState(false);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([]);

  const getUser = async () => {
    const user = await getItem<User>('user');
    setEvent({ ...event, users: [user?.id ?? 0] });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [draftImage, setDraftImage] = useState<string | null>(null);

  const uploadImage = async () => {
    if (!draftImage) return;

    const result = await FileSystem.uploadAsync(
      'https://quiet-retreat-10533.herokuapp.com/api/upload',
      draftImage,
      {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'files',
        mimeType: 'image/png',
      }
    );
    const body = await JSON.parse(result.body);
    return await body[0].id;
  };

  const [createEvent] = useMutation<{ createEvent: any }, Variables>(CREATE_EVENT);

  const createNewEvent = async () => {
    setLoading(true);
    const id = await uploadImage();
    const result = await createEvent({ variables: { data: { ...event, images: [id] } } });
    console.log(result.data?.createEvent.data.id, 'Selam');

    if (result.data?.createEvent.data.id) {
      setEvent(null);
      setCurrentIndex(0);
      props.navigation.navigate('Home');
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
      });
    } else Toast.show({ type: 'error', text1: result?.errors?.[0].message, position: 'bottom' });

    setLoading(false);
  };

  // Tab Status
  const items: TabStatusItem[] = [
    { title: 'Detay', icon: { name: 'calendar-outline', type: 'ionicon', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  const [event, setEvent] = useState<CreateEventModel | null>({
    eventDate: new Date(),
    publishedAt: new Date(),
  });

  const isLastStep = currentIndex === items.length - 1;

  return (
    <View style={styles.container}>
      <TabStatus items={items} currentIndex={currentIndex} onIndexChange={index => setCurrentIndex(index)} />
      {currentIndex === 0 && (
        <EventForm
          event={event}
          categoryLabelsChanged={newLabels => {
            setCategoryLabels(newLabels);
          }}
          onModelChange={newModel => {
            setEvent({ ...event, ...newModel });
          }}
        />
      )}

      {currentIndex === 1 && (
        <NewEventImageSection
          categoryLabels={categoryLabels}
          event={event}
          loading={createLoading}
          onImageChange={image => setDraftImage(image)}
          draftImage={draftImage}
        />
      )}
      <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 10 }}>
        <View style={{ flex: 1 }}>
          <Button
            title={isLastStep ? 'Gönder' : 'İleri'}
            color={colors.secondColor}
            icon={
              isLastStep
                ? { name: 'checkmark-done-outline', type: 'ionicon', size: 20, color: 'white' }
                : { name: 'chevron-forward-outline', type: 'ionicon', size: 20, color: 'white' }
            }
            iconPosition="right"
            size="lg"
            onPress={() => (isLastStep ? createNewEvent() : setCurrentIndex(currentIndex + 1))}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
});

export default NewEvent;
