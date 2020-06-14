import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ListSupervisor } from '../../../../screens/listSupervisor/ListSupervisor';
import { TopTapNavigator } from '../../../TopTapNavigator';

const Tab = createMaterialTopTabNavigator();

export const ApprovalsNavigator = ({ route }) => {
  const [typeApprove, setTypeApprove] = useState('Zones');

  useEffect(() => {
    if (route.params && route.params.screen) {
      setTypeApprove(route.params.screen);
    }
  }, [typeApprove]);

  return (
    <Tab.Navigator
      initialRouteName={typeApprove}
      tabBar={(props) => <TopTapNavigator {...props} />}
      lazy={true}
    >
      <Tab.Screen name="zones" options={{ tabBarLabel: 'Zones' }}>
        {(props) => <ListSupervisor typeApproval="ZONES" {...props}></ListSupervisor>}
      </Tab.Screen>
      <Tab.Screen name="identity" options={{ tabBarLabel: 'Visitor' }}>
        {(props) => <ListSupervisor typeApproval="IDENTITY" {...props}></ListSupervisor>}
      </Tab.Screen>
      <Tab.Screen name="photo" options={{ tabBarLabel: 'Picture' }}>
        {(props) => <ListSupervisor typeApproval="PHOTO" {...props}></ListSupervisor>}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

ApprovalsNavigator.propTypes = {
  route: PropTypes.object,
};
