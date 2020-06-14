import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DetailPost } from '../../../screens/detailPost/DetailPost';
import { ErrorComponent } from '../../../screens/errorComponent/ErrorComponent';
import Loading from '../../../screens/loading/Loading';
import { PageContainer } from '../../PageContainer';
import { PostNavigator } from './components/PostNavigator';

const Stack = createStackNavigator();

export const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Error" component={ErrorComponent} />
        <Stack.Screen
          name="ListPost"
          component={PageContainer(PostNavigator, { title: 'Post', favorite: false, margin: 0 })}
        />
        <Stack.Screen
          name="DetailPost"
          component={PageContainer(DetailPost, { title: '', backPath: true, favorite: true, margin: 0 })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
