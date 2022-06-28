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
import { Variables } from '../types/strapi/base/base';

// create a component
const NewEvent = () => {
  const items: TabStatusItem[] = [
    { title: 'Tarih', icon: { name: 'calendar-outline', type: 'ionicon', size: 20 }, isActive: true },
    { title: 'Görsel', icon: { name: 'image-outline', type: 'ionicon', size: 20 } },
    { title: 'Detay', icon: { name: 'form', type: 'antdesign', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [event, setEvent] = useState<CreateEventModel | null>({ publishedAt: Date() });

  const [createEvent, { data, loading, error }] = useMutation<CreateEventModel, Variables>(CREATE_EVENT);

  console.log(error);

  return (
    <View style={styles.container}>
      <TabStatus items={items} currentIndex={currentIndex} />
      {currentIndex === 0 && (
        <View style={{ flex: 1, alignItems: 'center', padding: 15, backgroundColor: 'white' }}>
          <Input
            value={event?.title}
            onChangeText={title => setEvent({ ...event, title })}
            placeholder="Başlık"
            rightIcon={{ type: 'meterial', name: 'edit', color: '#C06014' }}
            inputStyle={{ color: '#536162' }}
            placeholderTextColor="#536162"
            inputContainerStyle={{ borderBottomColor: '#424642' }}
            errorStyle={{ color: '#C06014' }}
          />
          <Input
            value={event?.description}
            onChangeText={description => setEvent({ ...event, description })}
            placeholder="Açıklama"
            rightIcon={{ type: 'meterial', name: 'edit', color: '#C06014' }}
            inputStyle={{ color: '#536162' }}
            placeholderTextColor="#536162"
            inputContainerStyle={{ borderBottomColor: '#424642' }}
            errorStyle={{ color: '#C06014' }}
          />
          <DropdownComponent items={[]} onChange={categoryId => setEvent({ categories: [categoryId] })} />
          <DatePicker onChange={eventDate => setEvent({ eventDate: eventDate })} />
          <Button
            title="Gönder"
            loading={loading}
            onPress={() => {
              createEvent({ variables: { data: event } });
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
