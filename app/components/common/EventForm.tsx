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

interface EventFormProps {
  event: CreateEventModel | null;
  onModelChange: (event: CreateEventModel) => void;
}
// create a component
const EventForm = (props: EventFormProps) => {
  const {
    data: queryData,
    refetch,
    loading: gueryLoading,
  } = useQuery<{ categories: Items<Category> }>(GET_CATEGORIES);

  const categories = queryData?.categories.data.map(c => ({ value: c.id, label: c.attributes.title }));
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
      }}
    >
      <BsInput
        value={props.event?.title}
        onChangeText={title => props.onModelChange({ ...props.event, title })}
        label="Başlık"
        rightIcon={{ type: 'evilicon', name: 'pencil', color: colors.secondColor }}
      />

      <BsInput
        value={props.event?.description}
        onChangeText={description => props.onModelChange({ ...props.event, description })}
        label="Açıklama"
        rightIcon={{ type: 'evilicon', name: 'pencil', color: colors.secondColor }}
      />

      <DatePicker onDateChange={eventDate => props.onModelChange({ ...props.event, eventDate })} />

      <BsDropdown
        items={categories ?? []}
        onChange={category =>
          props.onModelChange({
            ...props.event,
            categories: [category.value],
            categoryLabels: [category.label],
          })
        }
        dropDownLabel="Kategori"
        placeholder="Kategori Seçiniz"
      />
    </View>
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
