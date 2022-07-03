import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BsInput from './BsInput';
import colors from '../../styles/colors';
interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

const Example = (props: DatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <BsInput
        value={moment(date).format('LLL')}
        onTouchStart={() => setOpen(true)}
        label="Etkinlik Tarihi"
        rightIcon={{ type: 'evilicon', name: 'calendar', color: colors.secondColor }}
        disabled
      />
      <DateTimePickerModal
        confirmTextIOS="Onayla"
        cancelTextIOS="İptal"
        locale="tr"
        isVisible={open}
        mode="datetime"
        onConfirm={date => {
          setDate(date);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default Example;
