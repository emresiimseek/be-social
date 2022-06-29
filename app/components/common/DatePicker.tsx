import React, { useEffect, useState } from 'react';
import { Button, View, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Props } from '../../types/common/props';
import { Input } from '@rneui/themed';
import moment from 'moment';
import 'moment/locale/tr';
import { Icon } from '@rneui/base';

interface DatePickerProps extends Props {
  onChange: (date: Date) => void;
}

export default (props: DatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  moment.locale('tr');

  return (
    <>
      <Input
        onTouchStart={() => setOpen(true)}
        value={moment(date).format('LLL')}
        inputStyle={{ color: '#536162', fontSize: 14 }}
        inputContainerStyle={{ height: 35 }}
        rightIcon={{ type: 'evilicon', name: 'calendar', color: '#C06014', size: 30 }}
      />
      <DatePicker
        confirmText="Onayla"
        cancelText="İptal"
        title="Tarih Seçiniz"
        is24hourSource="locale"
        modal
        open={open}
        date={date}
        minimumDate={new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          props.onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
