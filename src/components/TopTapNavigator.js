import PropTypes from 'prop-types';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors } from '../styles/base';

export function TopTapNavigator({ state, descriptors, navigation, position }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 21,
        marginLeft: 14,
        height: 35,
        padding: 0,
        marginRight: 14,
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        borderRadius: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 1)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={[
              {
                flex: 1,
                margin: 0,
                backgroundColor: 'none',
                padding: 0,
                height: 35,
                justifyContent: 'center',
              },

              isFocused
                ? { backgroundColor: colors.green }
                : { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.green },
              index == 0 ? { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 } : null,
              index == inputRange.length - 1 ? { borderTopRightRadius: 5, borderBottomRightRadius: 5 } : null,
            ]}
          >
            <Animated.Text
              style={[
                { opacity },
                { textAlign: 'center', fontSize: 16 },
                { color: isFocused ? colors.white : colors.green },
              ]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

TopTapNavigator.propTypes = {
  state: PropTypes.any,
  descriptors: PropTypes.any,
  navigation: PropTypes.any,
  position: PropTypes.any,
};
