import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import { Button } from '@rneui/base';
import { useMutation } from '@apollo/client';
import { Variables } from '../../types/strapi/base/base';
import { CREATE_EVENT_REQUEST } from '../../logic/graphql/mutations/createEventRequest';
import { CreateEventRequest } from '../../types/strapi/models/event-request';
import { Props } from '../../types/common/props';
import { usePushNotification } from '../../logic/helpers/usePushNotification';
import { useEffect } from 'react';
import BsModal from '../common/BsModal';
import BsInput from '../common/BsInput';

interface ModalProps extends Props {
  visible: boolean;
  onClose: () => void;
  eventId: number;
  onChange?: () => void;
  eventUserIds: number[];
}

const EventRequestModal = (props: ModalProps) => {
  const [loadingBase, setLoading] = useState(false);
  const [model, setModel] = useState<CreateEventRequest>({
    publishedAt: new Date(),
    message: '',
  });

  useEffect(() => {
    setModel({ ...model, user: props.currentUserId, event: props.eventId });
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
              me: props.currentUserId,
              related_users: props.eventUserIds,
              type: 'request_to_join_event',
              event: props.eventId.toString(),
              event_request: result?.data.createEventRequest.data.id ?? '0',
            });

            await usePushNotification({
              me: props.currentUserId,
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
