import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import ChangePassword from '../../../../screens/changePassword/ChangePassword';
import { dimensions } from '../../../../styles/base';
import { DashboardTapNavigator } from './DashboardTapNavigator';
import { SideMenu } from './SideMenu';

const Drawer = createDrawerNavigator();

export const DashboardNavigator = ({ route }) => {
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Picture"
      drawerStyle={{
        backgroundColor: 'transparent',
        width: dimensions.fullWidth,
      }}
      screenOptions={{ gestureEnabled: true }}
      drawerContent={(props) => <SideMenu {...props} />}
    >
      <Drawer.Screen name="Home">
        {(props) => <DashboardTapNavigator {...props} route={route}></DashboardTapNavigator>}
      </Drawer.Screen>
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
};
