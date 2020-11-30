import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colors } from '../../styles/base';
import { formatFloatingPointNumber, randomColor } from '../../utils/Generalities';

export const ItemTag = ({ tag, setPostRead, id, handlerDelete }) => {
  const navigation = useNavigation();

  const toggleItem = async (id) => {
    setPostRead(id);
  };

  const getBackgroundColor = () => {
    return randomColor();
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <View>
          <Text style={{}}>Tag</Text>
        </View>
        <Animated.View style={[{ backgroundColor: getBackgroundColor(), ...styles.content }]}>
          <View style={[styles.itemContainer]}>
            <TouchableOpacity onPress={() => toggleItem(id)}>
              <Text style={styles.itemText}>{`$ ${formatFloatingPointNumber(tag, 2)}`}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={{ borderColor: colors.grayLight, borderWidth: 0.5 }}></View>
      </View>
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
    margin: 10,
    height: 100,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    marginLeft: 16,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
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

ItemTag.propTypes = {
  body: PropTypes.string,
  wasReading: PropTypes.bool,
  isFavorite: PropTypes.bool,
  setPostRead: PropTypes.func,
  id: PropTypes.number,
  index: PropTypes.any,
};
