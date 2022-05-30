import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { login } from '../logic/login';

class LoginPage extends Component {
  state = { identifier: '', password: '' };

  login = async () => {
    const value = await login(this.state.identifier, this.state.password);
    console.log(value);
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.state.identifier}
          onChangeText={identifier => this.setState({ ...this.state, identifier })}
          placeholder="E-Posta"
          rightIcon={{ type: 'meterial', name: 'alternate-email' }}
        />
        <Input
          onChangeText={password => this.setState({ ...this.state, password })}
          placeholder="Parola"
          rightIcon={{ type: 'meterial', name: 'lock' }}
        />
        <Button onPress={() => this.login()} title="Giriş" size="lg" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
});

export default LoginPage;
