import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export const EmptyList = ({ info = '' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: 290,
    height: 100,
    fontSize: 20,
  },
});

EmptyList.propTypes = {
  info: PropTypes.string,
};
