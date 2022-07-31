import * as FileSystem from 'expo-file-system';
import { STRAPI_API_URL } from '@env';

export const useUploadImage = async (image: string) => {
  const result = await FileSystem.uploadAsync(`${STRAPI_API_URL}/api/images`, image ?? '', {
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'files',
    mimeType: 'image/png',
  });
  const body = await JSON.parse(result.body);
  return await body[0].id;
};
