import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BackgroundImage, Button, ButtonGroup } from '@rneui/base';
import { Icon } from '@rneui/themed';
import colors from '../../styles/colors';
import { BsModal } from './Modal';

interface ImagePickerProps {
  onImageChanged: (image: string) => void;
  showMessage: boolean;
}
export default function ImagePickerComponent(props: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const launchCamera = async () => {
    const permissionsResult = await ImagePicker.getCameraPermissionsAsync();
    if ((await permissionsResult.granted) === false) {
      const res = await ImagePicker.requestCameraPermissionsAsync();
      // Alert.alert('No permissions!');
      return;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setModalVisible(false);

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
      setModalVisible(false);
      setImage(result.uri);
      props.onImageChanged(result.uri);
    }
  };

  return (
    <View style={{ marginHorizontal: 10, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <BsModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={{ padding: 10, minWidth: '100%' }}>
          <Button
            color={colors.secondColor}
            onPress={() => {
              launchCamera();
            }}
            style={{ paddingBottom: 10 }}
            icon={{ type: 'ionicon', name: 'camera-outline', color: 'white' }}
            title="Kamera"
            iconPosition="right"
            size="sm"
          />

          <Button
            color={colors.secondColor}
            onPress={() => {
              pickImage();
            }}
            icon={{ type: 'ionicon', name: 'image-outline', color: 'white' }}
            title="Galeri"
            iconContainerStyle={{ marginLeft: 20 }}
            iconPosition="right"
            size="sm"
          />
        </View>
      </BsModal>
      {!image && props.showMessage && (
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <ImageBackground
            source={{
              uri: `https://img.icons8.com/ios-glyphs/90/${colors.secondColor.replace(
                '#',
                ''
              )}/add-camera.png`,
            }}
            style={{ width: 80, height: 80 }}
          />
          <Text style={{ color: 'gray', fontSize: 13 }}>Bir görsel seçmek için tıklayınız.</Text>
        </Pressable>
      )}
    </View>
  );
}
