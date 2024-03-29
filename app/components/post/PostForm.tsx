import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../styles/colors';
import { Button } from '@rneui/base';
import { useQuery } from '@apollo/client';
import { Variables } from '../../types/strapi/base/base';
import { GET_EVENTS } from '../../logic/graphql/queries/getEvents';
import moment from 'moment';
import 'moment/locale/tr';
import BsDropdown from '../common/BsDropdown';
import BsInput from '../common/BsInput';

interface PostFormProps {
  post: any;
  onModelChange: (model: any) => void;
  userId?: number;
  onIncraseIndex: () => void;
}

const PostForm = (props: PostFormProps) => {
  moment.locale('tr');

  const now = new Date().setHours(0, 0, 0, 0);

  const { loading, error, data, refetch } = useQuery<any, Variables>(GET_EVENTS, {
    variables: {
      filters: {
        eventDate: { gt: new Date(now) },
        or: [{ owners: { id: { eq: props.userId } } }, { attendees: { id: { eq: props.userId } } }],
      },
    },
  });

  const events = data?.events.data.map((event: any) => ({
    label: `${event.attributes.description.substring(0, 19)}... / ${moment(event.attributes.eventDate).format(
      'LL'
    )}`,
    value: event.id,
  }));

  return (
    <Formik
      initialValues={{ ...props.post }}
      onSubmit={values => {
        props.onModelChange(values);
      }}
      validationSchema={yup.object().shape({
        description: yup.string().required('Açıklama gereklidir'),
        event: yup.string().required('Etkinlik gereklidir'),
      })}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldTouched, isValid, setFieldValue }) => (
        <>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: 'white',
            }}
          >
            <BsInput
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              errorMessage={errors.description}
              label="Açıklama"
              rightIcon={{ type: 'evilicon', name: 'pencil', color: colors.secondColor }}
            />
            <BsDropdown
              items={events}
              loading={loading}
              label="Etkinlik"
              placeholder="Etkinlik Seçiniz"
              errors={errors.event?.toString()}
              value={values.event}
              onChange={event => {
                setFieldValue('event', event.value);
              }}
            />
          </Pressable>

          <View
            style={{
              backgroundColor: colors.secondColor,
              padding: 25,
              width: '100%',
            }}
          >
            <Button
              color="white"
              onPress={() => handleSubmit()}
              titleStyle={{ color: colors.secondColor }}
              disabled={!isValid}
              title="İleri"
              size="lg"
              containerStyle={{ borderRadius: 5 }}
              iconPosition="right"
              icon={{
                name: 'chevron-forward-outline',
                type: 'ionicon',
                size: 20,
                color: isValid ? colors.secondColor : 'hsl(208, 8%, 63%)',
              }}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default PostForm;
