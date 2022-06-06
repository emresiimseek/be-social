import { Button } from '@rneui/base';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Props } from '../types/common/props';
import BaseComponent from '../components/common/BaseComponent';
import { getWelcomePage } from '../logic/welcome-page';
import { WelcomePage as StrapiWelcomePage } from '../types/strapi/strapi-welcome-page';
import { StrapiObject } from '../types/strapi/base/strapi-object';
import { BgImageObject } from '../types/strapi/base/strapi-image';
import { gql, useQuery } from '@apollo/client';

const welcome = gql`
  query GetWelcomePage {
    welcomePage {
      data {
        attributes {
          title
          description
          bg_image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function WelcomePage(props: Props) {
  const { loading, error, data } = useQuery<any>(welcome);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: data.welcomePage.data.attributes.bg_image.data[0].attributes.url }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.body}>
          <Text style={[styles.text, styles.title]}>{data?.welcomePage.data.attributes.title}</Text>
          <Text style={styles.text}>{data?.welcomePage.data.attributes.description}</Text>
        </View>
        <View style={styles.bottom}>
          <Button
            onPress={() => props.navigation.navigate('Login')}
            buttonStyle={styles.bottomButton}
            size="lg"
            title="Login"
            color="#FF4C29"
          />
          <Button
            onPress={() => props.navigation.navigate('Register')}
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

export default WelcomePage;

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
