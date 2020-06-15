import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colors } from '../../styles/base';

export const ItemPostList = ({ body, wasReading, isFavorite, setPostRead, id, handlerDelete }) => {
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

  let _swipeableRow = useRef();

  const updateRef = (ref) => {
    _swipeableRow = ref;
  };

  const close = () => {
    _swipeableRow.close();
  };

  const renderRightActions = (progress) => (
    <View style={{ width: 192, flexDirection: 'row' }}>
      {renderRightAction('Delete', colors.red, 192, progress)}
    </View>
  );

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      _swipeableRow.close();
      handlerDelete(id);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={(ref) => {
        _swipeableRow = ref;
      }}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
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
    </Swipeable>
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
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
});

ItemPostList.propTypes = {
  body: PropTypes.string,
  wasReading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  setPostRead: PropTypes.func,
  id: PropTypes.number,
  index: PropTypes.any,
};
