//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TabStatus from '../components/common/TabStatus';
import { TabStatusItem } from '../types/common/tab-status-item';
import { CreateEventModel } from '../types/common/create-event-model';
import { ApolloClient, InMemoryCache, useMutation } from '@apollo/client';
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
import { directNested, navigate } from '../RootNavigation';
import { UPLOAD } from '../logic/graphql/mutations/upload';
import { createUploadLink, ReactNativeFile } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({ uri: 'https://quiet-retreat-10533.herokuapp.com/graphql' }),
  headers: {
    Authorization:
      'Bearer 24d633612d6d4ee6e9eeb1ad6b98db3311cb435be52f552d98714a4e0fcf20929c7e4d7765b5f932b67bd956d83dd70ba37cb4b229863606665fe923c0da2a7bb21f645867c8dd270860e66281bd1e59f4ed6fe44543d3302e5018c46cb30b1551730649f89de87f811f483a90059da6e2448a251380d59be9376f773cc50a7e',
  },
  cache: new InMemoryCache(),
});

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
  const [file, setFile] = useState<ReactNativeFile | null>(null);

  const [createEvent] = useMutation<{ createEvent: any }, Variables>(CREATE_EVENT);
  const [upload, { error, data }] = useMutation(UPLOAD);

  const createNewEvent = async () => {
    if (!draftImage) {
      Toast.show({
        type: 'error',
        text1: 'Lütfen bir görsel seçiniz.',
      });
      return;
    }
    setLoading(true);
    // const id = await useUploadImage(draftImage);

    const resultUpload = await client.mutate({
      mutation: UPLOAD,
      variables: {
        file: file,
      },
    });

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
