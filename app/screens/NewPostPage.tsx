import React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import { TabStatusItem } from '../types/common/tab-status-item';
import { useEffect } from 'react';
import { getItem } from '../logic/helpers/useAsyncStorage';
import { CreatePostModel } from '../types/common/create-post-model';
import ImagePickerComponent from '../components/common/ImagePicker';
import { Button } from '@rneui/base';
import colors from '../styles/colors';
import Toast from 'react-native-toast-message';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../logic/graphql/mutations/createPost';
import { Variables } from '../types/strapi/base/base';
import { Props } from '../types/common/props';
import Loading from '../components/common/Loading';
import { directNested } from '../RootNavigation';
import { ImageInfo } from 'expo-image-picker';
import { useGraphqlUpload } from '../logic/helpers/useGraphqlUploadImage';
import { ReactNativeFile } from 'apollo-upload-client';
import PostForm from '../components/post/PostForm';
import PostCardPreview from '../components/post/PostCardPreview';
import CreatePageHeaderStatus from '../components/CreatePageHeaderStatus';

const NewPost = (props: Props) => {
  // Tab Status
  const items: TabStatusItem[] = [
    { title: 'Detay', icon: { name: 'pencil', type: 'material-community', size: 20 } },
    { title: 'Gönder', icon: { name: 'checkmark-done-outline', type: 'ionicon', size: 20 } },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();
  const isLastStep = currentIndex === items.length - 1;
  const [post, setPost] = useState<CreatePostModel | null>(null);
  const [draftImage, setImage] = useState<ImageInfo | null>(null);
  const [file, setFile] = useState<ReactNativeFile | null>(null);
  const [createPost] = useMutation<{ createPost: any }, Variables>(CREATE_POST);

  const createNewPost = async () => {
    if (!draftImage) {
      Toast.show({
        type: 'error',
        text1: 'Lütfen bir görsel seçiniz.',
      });
      return;
    }

    setLoading(true);
    const resultUpload = await useGraphqlUpload(file);
    const imageId = resultUpload.data.upload.data.id;

    const result = await createPost({
      variables: { data: { ...post, images: [imageId], users: [userId], publishedAt: new Date() } },
    });
    if (result.data?.createPost.data.id) {
      setPost(null);
      setImage(null);
      directNested('MyTabs', 'Home');
    }
    setLoading(false);
  };

  const getUserId = async () => {
    const userId = await getItem<number>('userId');
    setUserId(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CreatePageHeaderStatus
        loading={loading}
        items={items}
        currentIndex={currentIndex}
        onIndexChange={index => setCurrentIndex(index)}
      />
      {/* Form */}
      {currentIndex === 0 && (
        <PostForm
          onIncraseIndex={() => setCurrentIndex(currentIndex + 1)}
          post={post}
          onModelChange={post => {
            setPost(post);
            setCurrentIndex(currentIndex + 1);
          }}
          userId={userId}
        />
      )}
      {currentIndex === 1 &&
        (loading ? (
          <Loading />
        ) : (
          <>
            {draftImage && post && userId ? (
              <PostCardPreview image={draftImage} item={post} userId={userId} />
            ) : (
              <ImagePickerComponent
                showMessage={!draftImage}
                onFileChange={file => {
                  setFile(file);
                }}
                onImageChanged={image => {
                  setImage(image);
                }}
              />
            )}
          </>
        ))}

      {isLastStep && (
        <View
          style={{
            backgroundColor: colors.secondColor,
            padding: 25,
            width: '100%',
          }}
        >
          <Button
            disabled={!draftImage || loading}
            title="Gönder"
            loading={loading}
            color="white"
            titleStyle={{ color: colors.secondColor }}
            containerStyle={{ borderRadius: 5 }}
            icon={{
              name: 'checkmark-done-outline',
              type: 'ionicon',
              size: 20,
              color: !draftImage || loading ? 'hsl(208, 8%, 63%)' : colors.secondColor,
            }}
            iconPosition="right"
            size="lg"
            onPress={() => createNewPost()}
          />
        </View>
      )}
    </View>
  );
};

export default NewPost;
