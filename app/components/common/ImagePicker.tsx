import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/base';
import colors from '../../styles/colors';
import { BsModal } from './Modal';
import { ReactNativeFile } from 'apollo-upload-client';
import LottieView from 'lottie-react-native';
import { ImageInfo } from 'expo-image-picker';

interface ImagePickerProps {
  onImageChanged: (image: ImageInfo) => void;
  showMessage: boolean;
  onFileChange?: (file: ReactNativeFile) => void;
}

export default function ImagePickerComponent(props: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const launchCamera = async () => {
    const permissionsResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionsResult.granted === false) {
      const res = await ImagePicker.requestCameraPermissionsAsync();
      // Alert.alert('No permissions!');
      return;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setModalVisible(false);

      const file = new ReactNativeFile({
        uri: result.uri,
        name: Math.random() + '.jpg',
        type: 'image/jpeg',
      });

      props.onFileChange && props.onFileChange(file);
      setImage(result.uri);
      props.onImageChanged(result);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setModalVisible(false);
      setImage(result.uri);
      const file = new ReactNativeFile({
        uri: result.uri,
        name: 'a.jpg',
        type: 'image/jpeg',
      });

      props.onFileChange && props.onFileChange(file);
      props.onImageChanged(result);
    }
  };

  return (
    <View style={{ marginHorizontal: 10, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <BsModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={{ padding: 10, minWidth: '100%' }}>
          <Button
            onPress={() => {
              launchCamera();
            }}
            titleStyle={{ color: colors.secondColor }}
            buttonStyle={{
              borderColor: colors.secondColor,
            }}
            style={{ paddingBottom: 10 }}
            type="outline"
            icon={{ type: 'ionicon', name: 'camera-outline', color: colors.secondColor }}
            title="Kamera"
            iconPosition="right"
            size="sm"
          />

          <Button
            onPress={() => {
              pickImage();
            }}
            titleStyle={{ color: colors.secondColor }}
            buttonStyle={{
              borderColor: colors.secondColor,
            }}
            type="outline"
            icon={{ type: 'ionicon', name: 'image-outline', color: colors.secondColor }}
            title="Galeri"
            iconContainerStyle={{ marginLeft: 20 }}
            iconPosition="right"
            size="sm"
          />
        </View>
      </BsModal>
      {!image && props.showMessage && (
        <View
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
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <LottieView
              style={{ width: 200, height: 200 }}
              source={require('../../../local/assets/lottie/image-upload.json')}
              autoPlay={true}
              loop={true}
            />
            <Text
              style={{
                color: 'gray',
                fontSize: 13,
                textAlign: 'center',
                position: 'absolute',
                bottom: 15,
                left: 5,
              }}
            >
              Bir görsel seçmek için tıklayınız.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
