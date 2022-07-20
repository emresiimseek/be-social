//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Items } from '../../types/strapi/base/base';
import { EventRequestAttributes } from '../../types/strapi/models/event-request';
import { Props } from '../../types/common/props';
import BsIcon from '../icons/BsIcon';
import { Icon } from '@rneui/base';

interface EventRequestStatusProps extends Props {
  requests: Items<EventRequestAttributes>;
  onModal: () => void;
}
// create a component
const EventRequestStatus = (props: EventRequestStatusProps) => {
  const hasRequested = !!props.requests.data.find(r => +r.attributes.user.data.id === props.currentUserId);

  const isPending = !!props.requests.data.find(
    r => +r.attributes.user.data.id === props.currentUserId && r.attributes.status === 'pending'
  );

  const isRejected = !!props.requests.data.find(
    r => +r.attributes.user.data.id === props.currentUserId && r.attributes.status === 'rejected'
  );

  const isAccepted = !!props.requests.data.find(
    r => +r.attributes.user.data.id === props.currentUserId && r.attributes.status === 'accepted'
  );

  return (
    <>
      {hasRequested ? (
        <>
          {isPending && <BsIcon style={{ marginTop: 1 }} iconName="pending" color="red" />}
          {isRejected && <BsIcon iconName="refect" color="red" />}
          {isAccepted && <BsIcon iconName="accept" color="green" />}
        </>
      ) : (
        <Icon onPress={() => props.onModal()} name="person-add" type="octicon" size={20} />
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({});

interface EventRequestStatus {}
//make this component available to the app
export default EventRequestStatus;
