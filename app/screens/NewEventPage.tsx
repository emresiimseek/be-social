import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabStatusItem } from '../types/common/tab-status-item';
import { CreateEventModel } from '../types/common/create-event-model';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../logic/graphql/mutations/createEvent';
import { Variables } from '../types/strapi/base/base';
import { useEffect } from 'react';
import { User } from '../types/strapi/models/user';
import { getItem } from '../logic/helpers/useAsyncStorage';
import Toast from 'react-native-toast-message';
import NewEventImageSection from '../components/event/NewEventImageSection';
import { Button } from '@rneui/base';
import { colors } from '../styles/colors';
import { directNested } from '../RootNavigation';
import { ReactNativeFile } from 'apollo-upload-client';
import { ImageInfo } from 'expo-image-picker';
import { useGraphqlUpload } from '../logic/helpers/useGraphqlUploadImage';
import EventForm from '../components/event/EventForm';
import CreatePageHeaderStatus from '../components/CreatePageHeaderStatus';

const NewEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [createLoading, setLoading] = useState(false);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([]);
  const [isEventFormValid, setEventFormValid] = useState(false);

  const getUser = async () => {
    const user = await getItem<User>('user');
    setEvent({ ...event, owners: user?.id ? [user?.id] : [] });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [draftImage, setDraftImage] = useState<ImageInfo | null>(null);
  const [file, setFile] = useState<ReactNativeFile | null>(null);
  const [createEvent] = useMutation<{ createEvent: any }, Variables>(CREATE_EVENT);

  const createNewEvent = async () => {
    if (!draftImage) {
      Toast.show({
        type: 'error',
        text1: 'Lütfen bir görsel seçiniz.',
      });
      return;
    }
    setLoading(true);

    const resultUpload = await useGraphqlUpload(file);
    const imageId = resultUpload.data.upload.data.id;
    const result = await createEvent({ variables: { data: { ...event, images: [imageId] } } });

    if (result.data?.createEvent.data.id) {
      setEvent(null);
      setCurrentIndex(0);
      directNested('MyTabs', 'Home');
    } else Toast.show({ type: 'error', text1: result?.errors?.[0].message, position: 'bottom' });

    setLoading(false);
  };

  // Tab Status
  const items: TabStatusItem[] = [
    { title: 'Detay', icon: { name: 'calendar-outline', type: 'ionicon', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  const [event, setEvent] = useState<CreateEventModel | null>({ categories: [], publishedAt: new Date() });

  const isLastStep = currentIndex === items.length - 1;

  return (
    <View style={styles.container}>
      <CreatePageHeaderStatus
        items={items}
        currentIndex={currentIndex}
        onIndexChange={index => setCurrentIndex(index)}
        loading={createLoading}
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
          onFileChange={file => {
            setFile(file);
          }}
          createLoading={createLoading}
          event={event}
          loading={createLoading}
          onImageChange={image => setDraftImage(image)}
          draftImage={draftImage}
        />
      )}
      {isLastStep && (
        <View
          style={{
            backgroundColor: colors.secondColor,
            padding: 25,
            width: '100%',
          }}
        >
          <View>
            <Button
              disabled={!isEventFormValid || !draftImage || createLoading}
              title="Gönder"
              loading={createLoading}
              color="white"
              titleStyle={{ color: colors.secondColor }}
              containerStyle={{ borderRadius: 5 }}
              icon={{
                name: 'checkmark-done-outline',
                type: 'ionicon',
                size: 20,
                color:
                  !isEventFormValid || !draftImage || createLoading
                    ? 'hsl(208, 8%, 63%)'
                    : colors.secondColor,
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
