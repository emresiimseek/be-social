import React, { useEffect, useState } from 'react';
import 'moment/locale/tr';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
interface DatePickerProps {
  onDateChange: (date: Date) => void;
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
          props.onDateChange(date);
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
