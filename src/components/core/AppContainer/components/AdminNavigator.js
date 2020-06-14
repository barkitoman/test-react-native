import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { dimensions } from '../../../../styles/base';
import { AdminTabNavigator } from './AdminTapNavigator';
import { SideMenu } from './SideMenu';

const Drawer = createDrawerNavigator();

export const AdminNavigator = () => {
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Picture"
      drawerStyle={{
        backgroundColor: 'transparent',
        width: dimensions.fullWidth,
      }}
      screenOptions={{ gestureEnabled: true }}
      drawerContent={(props) => <SideMenu {...props} isAdmin="true" />}
    >
      <Drawer.Screen name="Home" component={AdminTabNavigator} />
    </Drawer.Navigator>
  );
};
