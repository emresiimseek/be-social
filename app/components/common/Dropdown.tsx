import { Icon } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Props } from '../../types/common/props';

interface DropdownProps extends Props {
  items: any[];
  onChange: (item: any) => void;
  placeholder?: string;
  dropDownLabel?: string;
}

const BsDropdown = (props: DropdownProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label, isFocus && { color: '#C06014' }]}>{props.dropDownLabel}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        containerStyle={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
        style={[
          styles.dropdown,
          isFocus && { borderColor: '#C06014' },
          !isFocus ? { borderRadius: 10 } : { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? props.placeholder : ''}
        searchPlaceholder="Ara"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        selectedTextProps={{ style: { color: '#86939e', fontSize: 16 } }}
        renderRightIcon={() => <Icon type="evilicon" name="tag" color="#C06014" />}
      />
    </View>
  );
};

export default BsDropdown;

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#D1D1D1',
    height: 50,
    paddingLeft: 10,
    paddingRight: 5,
    marginHorizontal: 10,
  },
  label: {
    paddingBottom: 5,
    color: '#D1D1D1',
    position: 'absolute',
    backgroundColor: 'white',
    fontWeight: 'bold',
    left: 25,
    top: -7,
    zIndex: 999,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
