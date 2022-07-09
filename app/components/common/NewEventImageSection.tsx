//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loading from './Loading';
import ImagePickerComponent from './ImagePicker';
import { CreateEventModel } from '../../types/common/create-event-model';
import { PreviewEventCard } from './PreviewEventCard';
import { ScrollView } from 'react-native';

interface NewEventImageSectionProps {
  loading: boolean;
  draftImage: string | null;
  event: CreateEventModel | null;
  categoryLabels: string[];
  onImageChange: (image: string) => void;
  createLoading: boolean;
}

// create a component
const NewEventImageSection = (props: NewEventImageSectionProps) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      {props.loading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <ImagePickerComponent
            showMessage={props.draftImage === null}
            onImageChanged={image => props.onImageChange(image)}
            createLoading={props.createLoading}
          />
          {props.draftImage && props.event && (
            <PreviewEventCard
              categoryLabels={props.categoryLabels}
              item={{ ...props.event, images: [props.draftImage] }}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default NewEventImageSection;
