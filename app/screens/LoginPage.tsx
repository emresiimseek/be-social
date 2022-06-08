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
          rightIcon={{ type: 'meterial', name: 'alternate-email', color: '#FF4C29' }}
          containerStyle={styles.input}
          inputStyle={{ color: 'white' }}
          placeholderTextColor="white"
          errorStyle={{ color: '#FF4C29' }}
          inputContainerStyle={{ borderBottomColor: 'white' }}
        />
        <Input
          onChangeText={password => this.setState({ ...this.state, password })}
          placeholder="Parola"
          rightIcon={{ type: 'meterial', name: 'lock', color: '#FF4C29' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'password')}
          containerStyle={styles.input}
          secureTextEntry={true}
          inputStyle={{ color: 'white' }}
          placeholderTextColor="white"
          inputContainerStyle={{ borderBottomColor: 'white' }}
          errorStyle={{ color: '#FF4C29' }}
        />
        <Button
          onPress={() => this.login()}
          title="Giriş"
          loading={this.state.loading}
          buttonStyle={styles.button}
          titleStyle={{ color: 'black' }}
          size="lg"
          color="#FF4C29"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#334756' },
  input: { marginBottom: 5 },
  button: { marginHorizontal: 10 },
});

export default LoginPage;
