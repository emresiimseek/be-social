import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Props } from '../../types/common/props';
import { BaseState } from '../../types/states/base-state';
import { AxiosResponse } from '../../types/common/axios-response';
import { StrapiError } from '../../types/strapi/base/error';

export default class BaseComponent<P> extends React.Component<P> {
  constructor(props: P) {
    super(props);
  }
  baseState: BaseState = { loading: false, validations: [] };

  async handleRequest<T>(request: () => Promise<AxiosResponse<T>>, succestText?: string) {
    this.setState({ loading: true });
    const result = await request();

    if (result.error && !result.validations?.length) {
      Toast.show({
        type: 'error',
        text1: result.error,
        position: 'bottom',
      });
    }

    if (result.data && succestText) {
      Toast.show({
        type: 'success',
        text1: succestText,
        position: 'bottom',
      });
    }

    if (!result) {
      Toast.show({
        type: 'error',
        text1: 'Bir şeyler ters gitti.',
        position: 'bottom',
      });
    }

    this.setState({
      validations: result.validations ?? [],
    });

    this.setState({ loading: false });

    return result?.data ? result : null;
  }

  getErrorMessage = (validations: StrapiError[], key: string) => {
    const value = validations?.find(x => x.path.find(p => p === key));

    return value?.message ?? '';
  };

  public render() {
    return <View></View>;
  }
}
