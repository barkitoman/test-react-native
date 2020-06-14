/* eslint-disable react/prop-types */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { imageDisplay } from '../../../../../assets/images';
import { AdminStackNavigator } from './AdminStackNavigator';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const IconMenuNavigator = ({ name }) => {
  return <Image source={name} style={styles.image} />;
};

export const AdminTabNavigator = () => {
  const renderIconMenuNavigator = ({ focused }) => {
    return (
      <IconMenuNavigator
        name={imageDisplay[`FacilityOwn${focused ? 'Active' : ''}`]}
        size={30}
      ></IconMenuNavigator>
    );
  };

  return (
    <Tab.Navigator
      backBehavior="history"
      removeClippedSubviews="true"
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#0164C3',
        inactiveBackgroundColor: '#0164C3',
        inactiveTintColor: '#689CE6',
        pressOpacity: 0,
        allowFontScaling: false,
        style: { height: 57, alignContent: 'flex-start' },
        tabStyle: { width: 80 },
      }}
      lazy={false}
    >
      <Tab.Screen
        name="Admin"
        component={AdminStackNavigator}
        options={{
          tabBarIcon: (props) => {
            return renderIconMenuNavigator(props);
          },
          tabBarLabel: 'Admin',
        }}
      />
      <Tab.Screen name=" " component={AdminStackNavigator} />
      <Tab.Screen name="  " component={AdminStackNavigator} />
      <Tab.Screen name="   " component={AdminStackNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
