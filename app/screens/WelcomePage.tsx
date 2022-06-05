import { Button } from '@rneui/base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Props } from '../types/common/props';
import BaseComponent from '../components/common/BaseComponent';
import { getWelcomePage } from '../logic/welcome-page';
import { WelcomePage as StrapiWelcomePage } from '../types/strapi/strapi-welcome-page';
import { StrapiObject } from '../types/strapi/base/strapi-object';
import { BgImageObject } from '../types/strapi/base/strapi-image';

interface WelcomePageState {
  model: StrapiWelcomePage | null;
  image: any;
}

class WelcomePage extends BaseComponent<Props> {
  componentDidMount = () => {
    this.get();
  };
  state: WelcomePageState = {
    image: {
      uri: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80',
    },
    model: null,
  };

  get = async () => {
    const result = await this.handleRequest<StrapiObject<StrapiWelcomePage>>(() => getWelcomePage());

    this.setState({ model: result?.data?.data.attributes });
  };

  getImage = (image?: BgImageObject) => image?.data[0].attributes.url;

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: this.getImage(this.state.model?.bg_image) }}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.body}>
            <Text style={[styles.text, styles.title]}>{this.state.model?.title}</Text>
            <Text style={styles.text}>{this.state.model?.description}</Text>
          </View>
          <View style={styles.bottom}>
            <Button
              onPress={() => this.props.navigation.navigate('Login')}
              buttonStyle={styles.bottomButton}
              size="lg"
              title="Login"
              color="#FF4C29"
            />
            <Button
              onPress={() => this.props.navigation.navigate('Register')}
              buttonStyle={styles.bottomButton}
              size="lg"
              title="Register"
              color="#FF4C29"
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
    backgroundColor: '#33475650',
    borderRadius: 5,
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
