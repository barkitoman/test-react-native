import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import ChangePassword from '../../../../screens/changePassword/ChangePassword';
import Confirmation from '../../../../screens/confirmation/Confirmation';
import PhotoValidation from '../../../../screens/photoValidation/PhotoValidation';
import Picture from '../../../../screens/picture/Picture';
import TakePhoto from '../../../../screens/takePhoto/TakePhoto';
import { dimensions } from '../../../../styles/base';
import { SideMenu } from './SideMenu';
import PageContainer from '../../../../components/PageContainer';

const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}

export const ValidationProfileNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Picture"
      drawerStyle={{
        backgroundColor: 'transparent',
        width: dimensions.fullWidth,
      }}
      screenOptions={{ gestureEnabled: false }}
      drawerContent={() => <SideMenu {...props} />}
    >
      <Drawer.Screen
        name="Picture"
        component={PageContainer(Picture, {
          hasScrollView: true,
          title: 'Welcome',
          haveMenu: true,
        })}
      />
      <Drawer.Screen name="TakePhoto" component={TakePhoto} />
      <Drawer.Screen name="PhotoValidation" component={PhotoValidation} />
      <Drawer.Screen name="Confirmation" component={Confirmation} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
};
