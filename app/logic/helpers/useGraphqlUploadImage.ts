import { createUploadLink, ReactNativeFile } from 'apollo-upload-client';
import { STRAPI_API_URL, STRAPI_TOKEN } from '@env';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { UPLOAD } from '../graphql/mutations/upload';

const client = new ApolloClient({
  link: createUploadLink({ uri: `${STRAPI_API_URL}/graphql` }),
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export const useGraphqlUpload = (file: ReactNativeFile | null) =>
  client.mutate({
    mutation: UPLOAD,
    variables: {
      file: file,
    },
  });
