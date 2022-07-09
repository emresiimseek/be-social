import { Icon } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Props } from '../../types/common/props';
import colors from '../../styles/colors';

interface DropdownProps extends Props {
  items: any[];
  onChange: (categories: any) => void;
  placeholder?: string;
  dropDownLabel?: string;
}

const DropdownComponent = (props: DropdownProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: colors.secondColor }]}>{props.dropDownLabel}</Text>
      );
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
          isFocus && { borderColor: colors.secondColor },
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
          props.onChange(item);
        }}
        selectedTextProps={{ style: { color: colors.dropdownSelectedTextColor, fontSize: 16 } }}
        renderRightIcon={() => <Icon type="evilicon" name="tag" color={colors.secondColor} />}
      />
      {props.children}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.focusColor,
    height: 50,
    paddingLeft: 10,
    paddingRight: 5,
    marginHorizontal: 10,
  },
  label: {
    paddingBottom: 5,
    color: colors.focusColor,
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
