import { Icon } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Props } from '../../types/common/props';

interface DropdownProps extends Props {
  items: any[];
  onChange: (item: any) => void;
}

const DropdownComponent = (props: DropdownProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ paddingBottom: 20 }}>
      <Dropdown
        style={[styles.dropdown]}
        selectedTextStyle={styles.selectedTextStyle}
        data={props.items}
        search
        maxHeight={300}
        placeholderStyle={{ color: '#546062', fontSize: 14 }}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Kategori Seçiniz' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          props.onChange(item);
        }}
        renderRightIcon={() => (
          <Icon type="evilicon" name="tag" size={30} style={{ paddingRight: 5 }} color="#C06014" />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: '#8b97a2',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
});
