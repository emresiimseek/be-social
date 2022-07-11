import * as FileSystem from 'expo-file-system';

export const useUploadImage = async (image: string) => {
  const result = await FileSystem.uploadAsync(
    'https://quiet-retreat-10533.herokuapp.com/api/upload',
    image ?? '',
    {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'files',
      mimeType: 'image/png',
    }
  );
  const body = await JSON.parse(result.body);
  return await body[0].id;
};
