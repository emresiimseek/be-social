import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, ButtonGroup } from '@rneui/base';

interface ImagePickerProps {
  onSelect: (image: string) => void;
}
export default function ImagePickerComponent(props: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const launchCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onSelect(result.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onSelect(result.uri);
    }
  };

  return (
    <View style={{ padding: 10, flexDirection: 'column' }}>
      <ButtonGroup
        onPress={index => {
          setCurrentIndex(index);
          index === 0 && launchCamera();
          index === 1 && pickImage();
        }}
        selectedIndex={currentIndex}
        buttons={['Kamera', 'Galeri']}
        selectedButtonStyle={{ backgroundColor: '#C06014' }}
        selectedTextStyle={{ color: 'white' }}
      />
    </View>
  );
}
