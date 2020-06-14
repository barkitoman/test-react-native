import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { colors } from '../styles/base';

export const InputSearch = ({ onChange, disabled = false, placeholder = undefined, reloadItems }) => {
  const [val, setVal] = useState('');

  const onChangeText = (value) => {
    setVal(value);
    onChange(value);
  };

  const clearInput = () => {
    onChange('');
    setVal('');
  };

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.contentInputSearch}
        placeholder={placeholder ? placeholder : 'Filter'}
        placeholderTextColor={colors.green}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        rightIcon={
          <Icon
            name={val.length > 0 ? 'close' : 'search'}
            type="evilicon"
            color={colors.green}
            onPress={() => {
              clearInput();
            }}
          />
        }
        autoCorrect={false}
        value={val}
        onChangeText={onChangeText}
        // onBlur={() => setFieldTouched('password')}
        // errorMessage={touched.password && errors.password ? errors.password : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentInputSearch: {
    backgroundColor: colors.white,
    paddingTop: 11,
    width: '95%',
  },
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
  },
  inputStyle: { color: colors.grayDark },
  inputContainerStyle: { borderRadius: 25, backgroundColor: colors.white, borderColor: colors.green },
});

InputSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  reloadItems: PropTypes.func.isRequired,
};
