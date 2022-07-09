//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CreateEventModel } from '../../types/common/create-event-model';
import BsInput from './BsInput';
import BsDropdown from './Dropdown';
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
import { Text } from 'react-native';
import { Button } from '@rneui/base';

interface EventFormProps {
  event: CreateEventModel | null;
  onModelChange: (event: CreateEventModel) => void;
  categoryLabelsChanged: (categoryLabels: string[]) => void;
}
// create a component
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
          <View
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
                onTouchStart={() => setDatePickerVisibility(!isDatePickerVisible)}
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

            <>
              <BsDropdown
                items={categories ?? []}
                onChange={categories => {
                  setFieldValue('categories', [categories.value]);
                  props.categoryLabelsChanged([categories.label]);
                }}
                dropDownLabel="Kategori"
                placeholder="Kategori Seçiniz"
              >
                <Text
                  style={{
                    margin: 5,
                    fontSize: 12,
                    color: 'red',
                    marginHorizontal: 15,
                  }}
                >
                  {errors?.categories}
                </Text>
              </BsDropdown>
            </>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              padding: 10,
              width: '100%',
              flex: 1,
            }}
          >
            <Button
              color={colors.secondColor}
              onPress={() => handleSubmit()}
              titleStyle={{ color: isValid ? 'white' : colors.thirdColor }}
              disabled={!isValid}
              title="İleri"
              size="lg"
              containerStyle={{ borderRadius: 10 }}
              iconPosition="right"
              icon={{
                name: 'chevron-forward-outline',
                type: 'ionicon',
                size: 20,
                color: isValid ? 'white' : 'hsl(208, 8%, 63%)',
              }}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.thirdColor,
  },
});

//make this component available to the app
export default EventForm;
