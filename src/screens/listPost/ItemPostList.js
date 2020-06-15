import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../styles/base';

export const ItemPostList = ({ body, wasReading, isFavorite, setPostRead, id }) => {
  const navigation = useNavigation();

  const toggleItem = async (id) => {
    setPostRead(id);
    setTimeout(() => {
      navigation.navigate('DetailPost');
    }, 100);
  };

  const getBackgroundColor = () => {
    return colors.white;
  };

  return (
    <Animated.View style={[{ backgroundColor: getBackgroundColor(), ...styles.content }]}>
      <TouchableOpacity onPress={() => toggleItem(id)}>
        <View style={[styles.itemContainer]}>
          <View style={{ width: '4%' }}>
            {isFavorite ? (
              <Icon name="ios-star" type="ionicon" color={colors.yellow} />
            ) : !wasReading ? (
              <View style={styles.notRead}></View>
            ) : null}
          </View>

          <View style={{ width: '90%' }}>
            <Text style={styles.itemText}>{body}</Text>
          </View>
          <Icon name="chevron-right" type="octicon" color={colors.grayDark} style={{ marginRight: 15 }} />
        </View>
        <View style={{ borderColor: colors.grayLight, borderWidth: 0.5 }}></View>
      </TouchableOpacity>
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

ItemPostList.propTypes = {
  body: PropTypes.string,
  wasReading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  setPostRead: PropTypes.func,
  id: PropTypes.number,
};
