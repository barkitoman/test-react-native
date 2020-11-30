import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ErrorComponent } from '../../../screens/errorComponent/ErrorComponent';
import ListTags from '../../../screens/listTags/ListTags';
import Loading from '../../../screens/loading/Loading';

const Stack = createStackNavigator();

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Error" component={ErrorComponent} />
        <Stack.Screen name="ListTags" component={ListTags} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
