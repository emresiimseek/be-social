//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Items } from '../../types/strapi/base/base';
import { EventRequestAttributes } from '../../types/strapi/models/event-request';
import { Props } from '../../types/common/props';
import BsIcon from '../icons/BsIcon';
import { Icon, Tooltip } from '@rneui/base';
import { colors } from '../../styles/colors';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { color } from '@rneui/base';

interface EventRequestStatusProps extends Props {
  requests: Items<EventRequestAttributes>;
  onModal: () => void;
}
// create a component
const EventRequestStatus = (props: EventRequestStatusProps) => {
  const hasRequested = !!props?.requests.data.find(r => +r.attributes.user.data.id === props.currentUserId);

  const isPending = !!props.requests.data.find(
    r => +r.attributes.user.data.id === props.currentUserId && r.attributes.status === 'pending'
  );

  const isRejected = !!props.requests.data.find(
    r => +r.attributes.user.data.id === props.currentUserId && r.attributes.status === 'rejected'
  );

  const isAccepted = !!props.requests.data.find(
    r => +r.attributes.user.data.id === props.currentUserId && r.attributes.status === 'accepted'
  );

  const getTooltipMessage = () => {
    if (isPending) {
      return 'Talebiniz beklemede.';
    }
    if (isRejected) {
      return 'Talebiniz reddedildi.';
    }
    if (isAccepted) {
      return 'Talebiniz kabul edildi.';
    }
  };

  const ToolTipInfo = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
      <TouchableOpacity
        onBlur={() => setOpen(false)}
        onPress={() => {
          setOpen(true);
        }}
      >
        <Tooltip
          width={200}
          backgroundColor={colors.secondColorOpacity}
          withOverlay={true}
          onClose={() => setOpen(false)}
          visible={open}
          popover={<Text style={{ color: 'white', fontSize: 14 }}>{getTooltipMessage()}</Text>}
        />
        {props.children}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {hasRequested ? (
        <>
          {isPending && (
            <ToolTipInfo>
              <Icon name="clock" type="feather" size={20} color="#3AB4F2" />
            </ToolTipInfo>
          )}
          {isRejected && <Icon name="x-circle" type="feather" size={20} color="#F47C7C" />}
          {isAccepted && <Icon name="check-circle" type="feather" size={20} color="#6BCB77" />}
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
