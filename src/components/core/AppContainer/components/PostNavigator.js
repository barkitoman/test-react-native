import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PropTypes from 'prop-types';
import React from 'react';
import ListPost from '../../../../screens/listPost/ListPost';
import { TopTapNavigator } from '../../../TopTapNavigator';

const Tab = createMaterialTopTabNavigator();

export const PostNavigator = ({ route }) => {
  return (
    <Tab.Navigator tabBar={(props) => <TopTapNavigator {...props} />} lazy={true} swipeEnabled={false}>
      <Tab.Screen name="all" options={{ tabBarLabel: 'All' }}>
        {(props) => <ListPost type="all" {...props}></ListPost>}
      </Tab.Screen>
      <Tab.Screen name="favorite" options={{ tabBarLabel: 'Favorites' }}>
        {(props) => <ListPost type="favorite" {...props}></ListPost>}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

PostNavigator.propTypes = {
  route: PropTypes.object,
};
