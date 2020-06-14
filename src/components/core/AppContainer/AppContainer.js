import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Loading from '../../../screens/loading/Loading';

const Stack = createStackNavigator();

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
