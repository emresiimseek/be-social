//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loading from './Loading';
import ImagePickerComponent from './ImagePicker';
import { CreateEventModel } from '../../types/common/create-event-model';
import { PreviewEventCard } from './PreviewEventCard';
import { ReactNativeFile } from 'apollo-upload-client';

interface NewEventImageSectionProps {
  loading: boolean;
  draftImage: string | null;
  event: CreateEventModel | null;
  categoryLabels: string[];
  onImageChange: (image: string) => void;
  createLoading: boolean;
  onFileChange: (file: ReactNativeFile) => void;
}

// create a component
const NewEventImageSection = (props: NewEventImageSectionProps) => {
  return (
    <View style={{ flex: 1 }}>
      {props.loading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          {props.draftImage && props.event ? (
            <PreviewEventCard
              categoryLabels={props.categoryLabels}
              item={{ ...props.event, images: [props.draftImage] }}
            />
          ) : (
            <ImagePickerComponent
              onFileChange={props.onFileChange}
              showMessage={props.draftImage === null}
              onImageChanged={image => props.onImageChange(image)}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

//make this component available to the app
export default NewEventImageSection;
