import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Loading from './Loading';
import ImagePickerComponent from './ImagePicker';
import { CreateEventModel } from '../../types/common/create-event-model';
import { PreviewEventCard } from './PreviewEventCard';
import { ReactNativeFile } from 'apollo-upload-client';
import { ImageInfo } from 'expo-image-picker';

interface NewEventImageSectionProps {
  loading: boolean;
  draftImage: ImageInfo | null;
  event: CreateEventModel | null;
  categoryLabels: string[];
  onImageChange: (image: ImageInfo) => void;
  createLoading: boolean;
  onFileChange: (file: ReactNativeFile) => void;
}

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
              item={{ ...props.event, images: [props.draftImage.uri] }}
              image={props.draftImage}
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

export default NewEventImageSection;
