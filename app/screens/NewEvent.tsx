//import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';
import { CreateEventModel } from '../types/common/create-event-model';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../logic/graphql/mutations/createEvent';
import { Variables } from '../types/strapi/base/base';
import { useEffect } from 'react';
import ImagePickerComponent from '../components/common/ImagePicker';
import { User } from '../types/strapi/models/user';
import { PreviewEventCard } from '../components/common/PreviewEventCard';
import { getItem } from '../logic/helpers/useAsyncStorage';
import EventForm from '../components/common/EventForm';
import EventFormArrows from '../components/common/EventFormArrows';
import * as FileSystem from 'expo-file-system';
import { Button } from '@rneui/base';
import Loading from '../components/common/Loading';
import { color } from '@rneui/base';
import { colors } from '../styles/colors';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { Event } from '../types/strapi/models/event';
import { Item } from '../types/strapi/base/base';
import Toast from 'react-native-toast-message';

// create a component
const NewEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<User | undefined>();
  const [result, setResult] = useState<any | undefined>();
  const [uploadedImageId, setUploadedImageId] = useState<number | undefined>();
  const [createLoading, setLoading] = useState(false);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([]);

  const getUser = async () => {
    const user = await getItem<User>('user');
    setUser(user);
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

  const [createEvent, { data, loading, error }] = useMutation<{ createEvent: any }, Variables>(CREATE_EVENT);

  const createNewEvent = async () => {
    setLoading(true);
    const id = await uploadImage();
    const value = { ...event, images: [id] };
    const result = await createEvent({ variables: { data: { ...event, images: [id] } } });
    console.log(result.data?.createEvent.data.id, 'Selam');

    if (result.data?.createEvent.data.id)
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
      });
    else Toast.show({ type: 'error', text1: result?.errors?.[0].message, position: 'bottom' });

    setLoading(false);
  };

  // Tab Status
  const items: TabStatusItem[] = [
    { title: 'Detay', icon: { name: 'calendar-outline', type: 'ionicon', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  // Current User
  const [event, setEvent] = useState<CreateEventModel | null>({
    eventDate: new Date(),
    publishedAt: new Date(),
  });

  const isDisabled = event?.title != '';
  console.log(error, 'error');

  return (
    <View style={styles.container}>
      <TabStatus items={items} currentIndex={currentIndex} />
      {currentIndex === 0 && (
        <EventForm
          onModelChange={newModel => {
            setEvent({ ...event, ...newModel });
          }}
          categoryLabelsChanged={newLabels => {
            setCategoryLabels(newLabels);
          }}
          event={event}
        />
      )}

      {currentIndex === 1 && (
        <>
          {createLoading ? (
            <Loading />
          ) : (
            <>
              <View style={{ flexDirection: 'column' }}>
                <ImagePickerComponent
                  showMessage={!event?.images?.length}
                  onImageChanged={image => setDraftImage(image)}
                />
              </View>
              {draftImage && event && (
                <PreviewEventCard categoryLabels={categoryLabels} item={{ ...event, images: [draftImage] }} />
              )}
            </>
          )}
        </>
      )}
      <EventFormArrows
        currentIndex={currentIndex}
        onIndexChange={index => setCurrentIndex(index)}
        onSubmit={createNewEvent}
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
