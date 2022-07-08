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
import { Alert } from 'react-native';
import { Button } from '@rneui/base';
import { colors } from '../styles/colors';

// create a component
const NewEvent = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createLoading, setLoading] = useState(false);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([]);
  const [isEventFormValid, setEventFormValid] = useState(false);

  const getUser = async () => {
    const user = await getItem<User>('user');
    setEvent({ ...event, users: [user?.id ?? 0] });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [draftImage, setDraftImage] = useState<string | null>(null);

  const uploadImage = async () => {
    const result = await FileSystem.uploadAsync(
      'https://quiet-retreat-10533.herokuapp.com/api/upload',
      draftImage ?? '',
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
    if (!draftImage) {
      Toast.show({
        type: 'error',
        text1: 'Lütfen bir resim seçiniz.',
      });
      return;
    }
    setLoading(true);
    const id = await uploadImage();
    const result = await createEvent({ variables: { data: { ...event, images: [id] } } });

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

  const [event, setEvent] = useState<CreateEventModel | null>({ categories: [] });

  const isLastStep = currentIndex === items.length - 1;

  return (
    <View style={styles.container}>
      <TabStatus
        items={items}
        currentIndex={currentIndex}
        onIndexChange={index => setCurrentIndex(index)}
        isValid={isEventFormValid}
        createLoading={createLoading}
      />
      {currentIndex === 0 && (
        <EventForm
          event={event}
          categoryLabelsChanged={newLabels => {
            setCategoryLabels(newLabels);
          }}
          onModelChange={newModel => {
            setEvent({ ...event, ...newModel });
            setEventFormValid(true);
            setCurrentIndex(currentIndex + 1);
          }}
        />
      )}

      {currentIndex === 1 && (
        <NewEventImageSection
          categoryLabels={categoryLabels}
          createLoading={createLoading}
          event={event}
          loading={createLoading}
          onImageChange={image => setDraftImage(image)}
          draftImage={draftImage}
        />
      )}
      {isLastStep && (
        <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 10 }}>
          <View style={{ flex: 1 }}>
            <Button
              disabled={!isEventFormValid || !draftImage || createLoading}
              title="Gönder"
              loading={createLoading}
              color={colors.secondColor}
              icon={{
                name: 'checkmark-done-outline',
                type: 'ionicon',
                size: 20,
                color: isEventFormValid ? 'hsl(208, 8%, 63%)' : 'white',
              }}
              iconPosition="right"
              size="lg"
              onPress={() => createNewEvent()}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
});

export default NewEvent;
