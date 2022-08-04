import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, ActionSheetIOS, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet, Button } from '@rneui/base';
import { ReactNativeFile } from 'apollo-upload-client';
import LottieView from 'lottie-react-native';
import { ImageInfo } from 'expo-image-picker';
import { Icon, ListItem } from '@rneui/themed';
import colors from '../../styles/colors';

interface ImagePickerProps {
  onImageChanged: (image: ImageInfo) => void;
  showMessage: boolean;
  onFileChange?: (file: ReactNativeFile) => void;
}

export default function ImagePickerComponent(props: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const list = [
    {
      title: 'Kamera',
      containerStyle: {},
      icon: { type: 'ionicon', name: 'camera-outline' },
      onPress: () => launchCamera(),
    },
    {
      title: 'Galeri',
      containerStyle: {},
      icon: { type: 'ionicon', name: 'image-outline' },
      onPress: () => pickImage(),
    },
    {
      title: 'İptal',
      icon: { name: 'close', type: 'material-community' },
      onPress: () => setBottomSheetVisible(false),
    },
  ];
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
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setBottomSheetVisible(false);

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
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setBottomSheetVisible(false);
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
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <BottomSheet onBackdropPress={() => setBottomSheetVisible(false)} isVisible={bottomSheetVisible}>
        {list.map((l, i) => (
          <ListItem
            bottomDivider={i === list.length - 2}
            key={i}
            onPress={l.onPress}
            containerStyle={l.containerStyle}
          >
            <ListItem.Content selectable>
              <ListItem.Title>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon type={l.icon.type} name={l.icon.name} color={colors.secondColor} />

                  <Text style={{ marginLeft: 5 }}>{l.title}</Text>
                </View>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

      {!image && props.showMessage && (
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ['Kamera', 'Galeri', 'İptal'],
                    cancelButtonIndex: 2,
                  },
                  buttonIndex => {
                    if (buttonIndex === 0) {
                      launchCamera();
                    } else if (buttonIndex === 1) {
                      pickImage();
                    }
                  }
                );
              } else {
                setBottomSheetVisible(!bottomSheetVisible);
              }
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
