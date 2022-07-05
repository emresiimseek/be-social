import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, ButtonGroup } from '@rneui/base';
import { Icon } from '@rneui/themed';
import colors from '../../styles/colors';

interface ImagePickerProps {
  onImageChanged: (image: string) => void;
  showMessage: boolean;
}
export default function ImagePickerComponent(props: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const launchCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onImageChanged(result.uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onImageChanged(result.uri);
    }
  };

  return (
    <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'column', alignItems: 'center' }}>
      <ButtonGroup
        containerStyle={{ width: '100%' }}
        onPress={index => {
          setCurrentIndex(index);
          index === 0 && launchCamera();
          index === 1 && pickImage();
        }}
        selectedIndex={currentIndex}
        buttons={[
          <Icon
            type="ionicon"
            name="camera-outline"
            color={currentIndex == 0 ? 'white' : colors.secondColor}
            style={{ paddingTop: 7 }}
          />,
          <Icon
            type="ionicon"
            name="image-outline"
            color={currentIndex == 1 ? 'white' : colors.secondColor}
            style={{ paddingTop: 7 }}
          />,
        ]}
        selectedButtonStyle={{ backgroundColor: colors.secondColor }}
        selectedTextStyle={{ color: 'white' }}
      />
      {!image && props.showMessage && (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text style={{ marginBottom: 5 }}>Neredeyse Tamam!</Text>
          <Text style={{ textAlign: 'center' }}>
            Istersen galerinden bir fotoğraf seçibilir ya da kamerayı kullanabilirsin.
          </Text>
        </View>
      )}
    </View>
  );
}
