import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/base';

export const ItemComment = ({ body }) => {
  const getBackgroundColor = () => {
    return colors.white;
  };

  return (
    <Animated.View style={[{ backgroundColor: getBackgroundColor(), ...styles.content }]}>
      <View style={[styles.itemContainer]}>
        <View style={{ width: '90%' }}>
          <Text style={styles.itemText}>{body}</Text>
        </View>
      </View>
      <View style={{ borderColor: colors.grayLight, borderWidth: 0.5 }}></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notRead: {
    width: 10,
    height: 10,
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
  content: {
    marginLeft: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 16,
    textAlign: 'left',
    fontSize: 14,
    color: colors.grayDark,
  },
});

ItemComment.propTypes = {
  body: PropTypes.string,
};
