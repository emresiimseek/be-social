//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import BsInput from './BsInput';
import { colors } from '../../styles/colors';
import { Button } from '@rneui/base';
import BsDropdown from './BsDropdown';
import { useQuery } from '@apollo/client';
import { Variables } from '../../types/strapi/base/base';
import { GET_EVENTS } from '../../logic/graphql/queries/getEvents';

interface PostFormProps {
  post: any;
  onModelChange: (model: any) => void;
  userId?: number;
  onIncraseIndex: () => void;
}

// create a component
const PostForm = (props: PostFormProps) => {
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
    label: event.attributes.title + '-' + event.attributes.description,
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
          <View
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
          </View>

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

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default PostForm;
