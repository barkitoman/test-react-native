import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { colors } from '../styles/base';
import API from '../utils/Api';
import { formatFloatingPointNumber } from '../utils/Generalities';

export const InputSearch = ({ onChange, disabled = false, placeholder = 'Add Tag' }) => {
  const [val, setVal] = useState('');

  const onChangeText = (value) => {
    setVal('$ ' + formatFloatingPointNumber(value, 2));
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const toggleItem = async (val) => {
    const tag = val.replace('$ ', '');
    try {
      const res = await API.tags.addTag({ tag });
      onChange({ id: getRandomInt(1000, 100000), tag: tag });
    } catch (error) {
      console.log('error service');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.contentInputSearch}
        placeholder={placeholder}
        placeholderTextColor={colors.green}
        inputStyle={styles.inputStyle}
        keyboardType={'decimal-pad'}
        inputContainerStyle={styles.inputContainerStyle}
        returnKeyType="go"
        autoCorrect={false}
        value={val}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={() => toggleItem(val)}>
        <View style={[styles.itemName]}>
          <Text style={{ color: colors.white }} numberOfLines={1}>
            Add
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentInputSearch: {
    backgroundColor: colors.green,
    width: '70%',
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.green,
    marginTop: 60,
    height: 41,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.green,
    padding: 8,
    borderRadius: 10,
  },
  inputStyle: { color: colors.grayDark },
  inputContainerStyle: {
    borderRadius: 25,
    backgroundColor: colors.white,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

InputSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};
