import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { CreateEventModel } from '../../types/common/create-event-model';
import DatePicker from '../common/DatePicker';
import { GET_CATEGORIES } from '../../logic/graphql/queries/getCategories';
import { Category } from '../../types/strapi/models/category';
import { Items } from '../../types/strapi/base/base';
import { useQuery } from '@apollo/client';
import colors from '../../styles/colors';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import 'moment/locale/tr';
import { useState } from 'react';
import { Button } from '@rneui/base';
import { Pressable } from 'react-native';
import BsInput from '../common/BsInput';
import BsDropdown from '../common/BsDropdown';

interface EventFormProps {
  event: CreateEventModel | null;
  onModelChange: (event: CreateEventModel) => void;
  categoryLabelsChanged: (categoryLabels: string[]) => void;
}

const EventForm = (props: EventFormProps) => {
  const {
    data: queryData,
    refetch,
    loading: gueryLoading,
  } = useQuery<{ categories: Items<Category> }>(GET_CATEGORIES);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const categories = queryData?.categories.data.map(c => ({ value: c.id, label: c.attributes.title }));
  return (
    <Formik
      initialValues={{ ...props.event, categories: [] }}
      onSubmit={values => {
        props.onModelChange(values);
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required('Başlık gereklidir'),
        description: yup.string().required('Açıklama gereklidir'),
        categories: yup.array().length(1, 'Kategori zorunludur.').required('Kategori gereklidir'),
        eventDate: yup.date().required('Tarih gereklidir'),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        isValid,
        setFieldValue,
      }) => (
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
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={() => setFieldTouched('title')}
              errorMessage={errors.title}
              label="Başlık"
              rightIcon={{ type: 'evilicon', name: 'pencil', color: colors.secondColor }}
            />

            <BsInput
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              errorMessage={errors.description}
              label="Açıklama"
              rightIcon={{ type: 'evilicon', name: 'pencil', color: colors.secondColor }}
            />

            <>
              <BsInput
                value={values.eventDate ? moment(values.eventDate).format('LLL') : ''}
                onFocus={() => {
                  Keyboard.dismiss();
                  setDatePickerVisibility(!isDatePickerVisible);
                }}
                onBlur={() => setFieldTouched('eventDate')}
                errorMessage={errors.eventDate}
                label="Etkinlik Tarihi"
                rightIcon={{ type: 'evilicon', name: 'calendar', color: colors.secondColor }}
              />
              <DatePicker
                value={isDatePickerVisible}
                onDateChange={date => setFieldValue('eventDate', date)}
                onValueChange={() => setDatePickerVisibility(false)}
              />
            </>
            <BsDropdown
              items={categories ?? []}
              loading={gueryLoading}
              onChange={category => {
                setFieldValue('categories', [category.value]);
                props.categoryLabelsChanged([category.label]);
              }}
              errors={errors.categories}
              label="Kategori"
              placeholder="Kategori seçiniz"
            />
          </Pressable>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: colors.secondColor,
              padding: 25,
              paddingTop: 15,
              width: '100%',
              flex: 1,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.thirdColor,
  },
});

export default EventForm;
