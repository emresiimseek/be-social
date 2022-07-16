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
import Toast from 'react-native-toast-message';
import NewEventImageSection from '../components/common/NewEventImageSection';
import { Props } from '../types/common/props';
import { Button } from '@rneui/base';
import { colors } from '../styles/colors';
import { useUploadImage } from '../logic/helpers/useImageUpload';
import { navigate } from '../RootNavigation';

// create a component
const NewEvent = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createLoading, setLoading] = useState(false);
  const [categoryLabels, setCategoryLabels] = useState<string[]>([]);
  const [isEventFormValid, setEventFormValid] = useState(false);

  const getUser = async () => {
    const user = await getItem<User>('user');
    setEvent({ ...event, owners: [user?.id ?? 0] });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [draftImage, setDraftImage] = useState<string | null>(null);

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
    const id = await useUploadImage(draftImage);
    const result = await createEvent({ variables: { data: { ...event, images: [id] } } });

    if (result.data?.createEvent.data.id) {
      setEvent(null);
      setCurrentIndex(0);
      navigate('MyTabs');
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

  const [event, setEvent] = useState<CreateEventModel | null>({ categories: [], publishedAt: new Date() });

  const isLastStep = currentIndex === items.length - 1;

  return (
    <View style={styles.container}>
      <TabStatus
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
