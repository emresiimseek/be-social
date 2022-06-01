import { Button } from '@rneui/base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Props } from '../types/common/props';

class WelcomePage extends Component<Props> {
  state = {
    image: {
      uri: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={this.state.image} resizeMode="cover" style={styles.image}>
          <View style={styles.body}>
            <Text style={[styles.text, styles.title]}>Be Social</Text>
            <Text style={styles.text}>
              Lorem Ipsum pasajlarının birçok çeşitlemesi vardır. Ancak bunların büyük bir çoğunluğu mizah
              katılarak veya rastgele sözcükler eklenerek değiştirilmişlerdir.
            </Text>
          </View>
          <View style={styles.bottom}>
            <Button
              onPress={() => this.props.navigation.navigate('Login')}
              buttonStyle={styles.bottomButton}
              size="lg"
              title="Login"
              color="#000000c0"
            />
            <Button
              onPress={() => this.props.navigation.navigate('Register')}
              buttonStyle={styles.bottomButton}
              size="lg"
              title="Register"
              color="#000000c0"
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    color: 'white',
    backgroundColor: '#000000c0',
    padding: 50,
    minHeight: '33%',
    width: '90%',
  },

  text: { color: 'white', textAlign: 'center' },
  bottom: { bottom: 40, position: 'absolute', width: '100%' },
  bottomButton: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default WelcomePage;
