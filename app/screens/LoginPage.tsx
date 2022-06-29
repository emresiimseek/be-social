import { Button } from '@rneui/base';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { login } from '../logic/login';
import { Props } from '../types/common/props';
import BaseComponent from '../components/common/BaseComponent';
import { BaseState } from '../types/states/base-state';
import { AutResponse } from '../types/strapi/models/aut-response';
import BsInput from '../components/common/BsInput';

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
        <BsInput
          value={this.state.identifier}
          onChangeText={identifier => this.setState({ ...this.state, identifier })}
          label="E-Posta"
          rightIcon={{ type: 'meterial', name: 'alternate-email', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'identifier')}
        />

        <BsInput
          value={this.state.password}
          onChangeText={password => this.setState({ ...this.state, password })}
          label="Parola"
          rightIcon={{ type: 'meterial', name: 'lock', color: '#C06014', size: 20 }}
          errorMessage={this.getErrorMessage(this.state.validations, 'password')}
          password
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
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' },
  input: { marginBottom: 5 },
  button: { marginHorizontal: 10 },
});

export default LoginPage;
