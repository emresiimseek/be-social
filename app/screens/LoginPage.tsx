import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { login } from '../logic/login';
import { Props } from '../types/common/props';
import BaseComponent from '../components/common/BaseComponent';
import { BaseState } from '../types/states/base-state';
import { AutResponse } from '../types/strapi/models/aut-response';

export interface LoginState extends BaseState {
  identifier: string;
  password: string;
}

class LoginPage extends BaseComponent<Props> {
  state: LoginState = { identifier: '', password: '', ...this.baseState };

  login = async () => {
    const result = await this.handleRequest<AutResponse>(() =>
      login(this.state.identifier, this.state.password)
    );

    if (result?.data?.jwt) this.props.navigation.navigate('MyTabs');
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.state.identifier}
          onChangeText={identifier => this.setState({ ...this.state, identifier })}
          placeholder="E-Posta"
          errorMessage={this.getErrorMessage(this.state.validations, 'identifier')}
          rightIcon={{ type: 'meterial', name: 'alternate-email', color: '#C06014' }}
          containerStyle={styles.input}
          inputStyle={{ color: '#536162' }}
          placeholderTextColor="#536162"
          errorStyle={{ color: '#C06014' }}
          inputContainerStyle={{ borderBottomColor: '#536162' }}
        />
        <Input
          onChangeText={password => this.setState({ ...this.state, password })}
          placeholder="Parola"
          rightIcon={{ type: 'meterial', name: 'lock', color: '#C06014' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'password')}
          containerStyle={styles.input}
          secureTextEntry={true}
          inputStyle={{ color: '#536162' }}
          placeholderTextColor="#536162"
          inputContainerStyle={{ borderBottomColor: '#424642' }}
          errorStyle={{ color: '#C06014' }}
        />
        <Button
          onPress={() => this.login()}
          title="Giriş"
          loading={this.state.loading}
          buttonStyle={styles.button}
          titleStyle={{ color: '#F3F4ED' }}
          size="lg"
          color="#C06014"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F3F4ED' },
  input: { marginBottom: 5 },
  button: { marginHorizontal: 10 },
});

export default LoginPage;
