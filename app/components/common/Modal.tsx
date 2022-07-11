import { Icon } from '@rneui/base';
import React, { Component } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Props } from '../../types/common/props';

interface ModalProps extends Props {
  visible: boolean;
  onClose: () => void;
}

export const BsModal = (props: ModalProps) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <Pressable style={styles.centeredView}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              props.onClose();
            }}
          ></Pressable>
          <View style={styles.modalView}>{props.children ? <>{props.children}</> : <Text>Modal</Text>}</View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 15,
    padding: 20,
    minHeight: '15%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BsModal;
