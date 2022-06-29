import { Button } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BaseComponent from '../components/common/BaseComponent';
import { register } from '../logic/register';
import { Props } from '../types/common/props';
import { BaseState } from '../types/states/base-state';
import Toast from 'react-native-toast-message';
import { User } from '../types/strapi/models/user';
import BsInput from '../components/common/BsInput';

export interface RegisterPageStates extends BaseState {
  user: User | null;
}

export default class RegisterPageComponent extends BaseComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  state: RegisterPageStates = { user: null, ...this.baseState };

  register = async () => {
    if (this.state.user == null) {
      Toast.show({
        type: 'error',
        text2: 'Lütfen boş alanları doldurunuz.',
        position: 'bottom',
      });

      return;
    }

    const result = await this.handleRequest<User>(() => register(this.state.user), 'Başarılı');

    if (result?.data) {
      Toast.show({
        type: 'success',
        text2: 'Başarılı',
        position: 'top',
      });
      this.setState({ user: null });
      this.props.navigation.navigate('Login');
    }
  };

  public render() {
    return (
      <View style={styles.container}>
        <BsInput
          value={this.state.user?.firstname}
          onChangeText={firstname => this.setState({ user: { ...this.state.user, firstname } })}
          label="Ad"
          rightIcon={{ type: 'meterial', name: 'person', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'firstname')}
        />
        <BsInput
          value={this.state.user?.lastname}
          onChangeText={lastname => this.setState({ user: { ...this.state.user, lastname } })}
          label="Soyad"
          rightIcon={{ type: 'meterial', name: 'person', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'lastName')}
        />

        <BsInput
          value={this.state.user?.username}
          onChangeText={username => this.setState({ user: { ...this.state.user, username } })}
          label="Kullanıcı Adı"
          rightIcon={{ type: 'meterial', name: 'alternate-email', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'username')}
        />

        <BsInput
          value={this.state.user?.email}
          onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
          label="E-Posta"
          rightIcon={{ type: 'meterial', name: 'email', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'email')}
        />

        <BsInput
          value={this.state.user?.password}
          onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
          label="Parola"
          rightIcon={{ type: 'meterial', name: 'lock', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'email')}
          password
        />
        <BsInput
          value={this.state.user?.password}
          onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
          label="Parola Tekrar"
          rightIcon={{ type: 'meterial', name: 'lock', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'email')}
          password
        />

        <Button
          title="Kaydet"
          color="#C06014"
          titleStyle={{ color: '#F3F4ED' }}
          buttonStyle={styles.button}
          onPress={() => this.register()}
          size="lg"
          loading={this.state.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  input: { marginBottom: 5 },
  button: { marginHorizontal: 10, marginVertical: 20 },
});
