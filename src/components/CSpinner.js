import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors, fonts } from '../styles/base';

export const CSpinner = ({ loading, text }) => {
  return (
    <Spinner visible={loading} textContent={text ? text : 'Loading...'} textStyle={styles.spinnerTextStyle} />
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.white,
    fontFamily: fonts.primary,
  },
});

CSpinner.propTypes = {
  loading: PropTypes.any,
  text: PropTypes.any,
};
