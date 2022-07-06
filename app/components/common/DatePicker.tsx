import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BsInput from './BsInput';
import colors from '../../styles/colors';
interface DatePickerProps {
  onDateChange: (date: string) => void;
  value: boolean;
  onValueChange: () => void;
}

const Example = (props: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(props.value);

  useEffect(() => {
    setOpen(props.value);
  }, [props.value]);

  return (
    <>
      <DateTimePickerModal
        confirmTextIOS="Onayla"
        cancelTextIOS="İptal"
        locale="tr"
        isVisible={open}
        mode="datetime"
        onConfirm={date => {
          setDate(date);
          setOpen(false);
          props.onDateChange(moment(date).format('LLL'));
        }}
        onCancel={() => {
          setOpen(false);
          props.onValueChange();
        }}
      />
    </>
  );
};

export default Example;
