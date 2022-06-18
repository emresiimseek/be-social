import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BaseComponent from '../components/common/BaseComponent';
import { register } from '../logic/register';
import { Props } from '../types/common/props';
import { BaseState } from '../types/states/base-state';
import Toast from 'react-native-toast-message';
import { User } from '../types/strapi/models/user';

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
        <Input
          value={this.state.user?.firstname}
          onChangeText={firstname => this.setState({ user: { ...this.state.user, firstname } })}
          placeholder="Ad"
          rightIcon={{ type: 'meterial', name: 'person', color: '#C06014' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'firstname')}
          containerStyle={styles.input}
          inputStyle={{ color: '#536162' }}
          placeholderTextColor="#536162"
          errorStyle={{ color: '#C06014' }}
        />
        <Input
          value={this.state.user?.lastname}
          onChangeText={lastname => this.setState({ user: { ...this.state.user, lastname } })}
          placeholder="Soyad"
          rightIcon={{ type: 'meterial', name: 'person', color: '#C06014' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'lastName')}
          containerStyle={styles.input}
          placeholderTextColor="#536162"
          inputStyle={{ color: '#536162' }}
          errorStyle={{ color: '#C06014' }}
        />
        <Input
          value={this.state.user?.username}
          onChangeText={username => this.setState({ user: { ...this.state.user, username } })}
          placeholder="Kullanıcı Adı"
          rightIcon={{ type: 'meterial', name: 'alternate-email', color: '#C06014' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'username')}
          containerStyle={styles.input}
          inputStyle={{ color: '#536162' }}
          placeholderTextColor="#536162"
          errorStyle={{ color: '#C06014' }}
        />
        <Input
          value={this.state.user?.email}
          onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
          placeholder="E-Posta"
          rightIcon={{ type: 'meterial', name: 'email', color: '#C06014' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'email')}
          containerStyle={styles.input}
          inputStyle={{ color: '#536162' }}
          placeholderTextColor="#536162"
          errorStyle={{ color: '#C06014' }}
        />
        <Input
          value={this.state.user?.password}
          onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
          placeholder="Parola"
          rightIcon={{ type: 'meterial', name: 'lock', color: '#C06014' }}
          containerStyle={styles.input}
          errorMessage={this.getErrorMessage(this.state.validations, 'password')}
          secureTextEntry={true}
          inputStyle={{ color: '#536162' }}
          placeholderTextColor="#536162"
          errorStyle={{ color: '#C06014' }}
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
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F3F4ED' },
  input: { marginBottom: 5 },
  button: { marginHorizontal: 10, marginVertical: 20 },
});
