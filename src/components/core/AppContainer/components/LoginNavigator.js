/* eslint-disable import/namespace */
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChangePassword from '../../../../screens/changePassword/ChangePassword';
import ChangePasswordConfirm from '../../../../screens/changePasswordConfirm/ChangePasswordConfirm';
import ForgotPassword from '../../../../screens/forgotPassword/ForgotPassword';
import Intro from '../../../../screens/intro/Intro';

const Stack = createStackNavigator();

export const LoginNavigator = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangePasswordConfirm" component={ChangePasswordConfirm} />
    </Stack.Navigator>
  );
};
