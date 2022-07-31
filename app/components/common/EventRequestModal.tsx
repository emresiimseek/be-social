import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { BsModal } from './Modal';
import BsInput from './BsInput';
import colors from '../../styles/colors';
import { Button } from '@rneui/base';
import { useMutation } from '@apollo/client';
import { Data, Variables } from '../../types/strapi/base/base';
import { CREATE_EVENT_REQUEST } from '../../logic/graphql/mutations/createEventRequest';
import { CreateEventRequest } from '../../types/strapi/models/event-request';
import { Props } from '../../types/common/props';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { Item } from '../../types/strapi/base/base';

interface ModalProps extends Props {
  visible: boolean;
  onClose: () => void;
  eventId: number;
  onChange?: () => void;
  eventUserIds: number[];
}
// create a component
const EventRequestModal = (props: ModalProps) => {
  const [loadingBase, setLoading] = useState(false);
  const [model, setModel] = useState<CreateEventRequest>({
    publishedAt: new Date(),
    message: '',
  });

  useEffect(() => {
    setModel({ ...model, user: props.currentUserId ?? 0, event: props.eventId });
  }, [props.currentUserId]);

  const [createRequest, { data, loading, error }] = useMutation<any, Variables>(CREATE_EVENT_REQUEST);

  return (
    <BsModal visible={props.visible} minHeight="26%" onClose={props.onClose}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          marginBottom: 5,
          color: colors.secondColor,
          fontWeight: 'bold',
        }}
      >
        Etkinlik Katılma İsteği
      </Text>
      <BsInput
        value={model.message}
        multiline
        onChangeText={value => setModel({ ...model, message: value })}
        label="Mesajınız"
        rightIcon={{ name: 'mail', type: 'feather', color: colors.secondColor, size: 20 }}
      />

      <View style={{ minWidth: '95%' }}>
        <Button
          title="Gönder"
          disabled={loading || !model.message || loadingBase}
          loading={loading}
          color={colors.secondColor}
          titleStyle={{ color: 'white', fontSize: 15 }}
          containerStyle={{ borderRadius: 5 }}
          icon={{
            name: 'checkmark-done-outline',
            type: 'ionicon',
            size: 20,
            color: loading || !model.message ? 'hsl(208, 8%, 63%)' : 'white',
          }}
          iconPosition="right"
          size="lg"
          onPress={async () => {
            setLoading(true);
            const result = await createRequest({ variables: { data: model } });
            console.log({
              me: props.currentUserId ?? 0,
              related_users: props.eventUserIds,
              type: 'request_to_join_event',
              event: props.eventId.toString(),
              event_request: result?.data.createEventRequest.data.id ?? '0',
            });

            await usePushNotification({
              me: props.currentUserId ?? 0,
              related_users: props.eventUserIds,
              type: 'request_to_join_event',
              event: props.eventId.toString(),
              event_request: result?.data.createEventRequest.data.id ?? '0',
            });
            setLoading(false);
            props.onChange && props.onChange();
            props.onClose();
          }}
        />
      </View>
    </BsModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default EventRequestModal;
