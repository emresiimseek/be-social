import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { login } from '../logic/login';
import { LoginState } from '../types/states/login-state';

class LoginPage extends Component {
  state: LoginState = { identifier: '', password: '', validations: [] };

  login = async () => {
    const value = await login(this.state.identifier, this.state.password);

    if (value.data?.jwt) this.props.navigation.navigate('MyTabs');

    this.setState({ ...this.state, validations: value.validations });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.state.identifier}
          onChangeText={identifier => this.setState({ ...this.state, identifier })}
          placeholder="E-Posta"
          errorMessage={this.state?.validations?.find(x => x.path.find(p => p === 'identifier'))?.message}
          rightIcon={{ type: 'meterial', name: 'alternate-email' }}
        />
        <Input
          onChangeText={password => this.setState({ ...this.state, password })}
          placeholder="Parola"
          rightIcon={{ type: 'meterial', name: 'lock' }}
          errorMessage={this.state?.validations?.find(x => x.path.find(p => p === 'password'))?.message}
        />
        <Button onPress={() => this.login()} title="Giriş" size="lg" style={styles.button} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  button: { marginTop: 10 },
});

export default LoginPage;
