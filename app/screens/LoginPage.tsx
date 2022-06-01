import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { login } from '../logic/login';
import { Props } from '../types/common/props';
import HomePageComponent from './Home/HomePage';
import BaseComponent from '../components/common/BaseComponent';
import { AutResponse } from '../types/strapi/response/aut-response';
import { BaseState } from '../types/states/base-state';

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
          rightIcon={{ type: 'meterial', name: 'alternate-email' }}
          containerStyle={styles.input}
        />
        <Input
          onChangeText={password => this.setState({ ...this.state, password })}
          placeholder="Parola"
          rightIcon={{ type: 'meterial', name: 'lock' }}
          errorMessage={this.getErrorMessage(this.state.validations, 'password')}
          containerStyle={styles.input}
          secureTextEntry={true}
        />
        <Button onPress={() => this.login()} title="Giriş" size="lg" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 5 },
});

export default LoginPage;
