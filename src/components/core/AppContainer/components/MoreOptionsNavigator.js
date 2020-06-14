/* eslint-disable import/default */
/* eslint-disable import/namespace */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */

import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import AddZone from '../../../../screens/addZone/AddZone';
import Facility from '../../../../screens/facility/Facility';
import FacilityManager from '../../../../screens/facilityManager/FacilityManager';
import { OptionsSubMenu } from '../../../../screens/optionSubMenu/OptionsSubMenu';
import Sensor from '../../../../screens/sensor/Sensor';
import User from '../../../../screens/user/User';
import Zone from '../../../../screens/zone/Zone';
import PageContainer from '../../../PageContainer';
import { ContextSuperUser, SuperUserProvider } from '../context/ContextSuperUser';

const Stack = createStackNavigator();

export const MoreOptionsNavigator = ({ navigation, moreRoutes }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.navigate('ScreenOptions');
    });

    return unsubscribe;
  }, [navigation]);

  var routes = moreRoutes.map((element, index) => {
    const TestWarp = element.props.component;
    return (
      <Stack.Screen name={element.props.name} key={index}>
        {(props) => <TestWarp {...props}></TestWarp>}
      </Stack.Screen>
    );
  });

  return (
    <SuperUserProvider>
      <ContextSuperUser.Consumer>
        {() => (
          <Stack.Navigator headerMode={'none'} initialRouteName="ScreenOptions">
            {routes}
            <Stack.Screen name="Zone" component={Zone} />
            <Stack.Screen name="Sensor" component={Sensor} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="FacilityManager" component={FacilityManager} />
            <Stack.Screen name="Facility">{(props) => <Facility {...props}></Facility>}</Stack.Screen>
            <Stack.Screen
              name="AddZones"
              component={PageContainer(AddZone, {
                title: 'Add Zone',
                hasScrollView: false,
                withCircleHeader: true,
                backPath: 'CreateUser',
                margin: 0,
                leftHeader: false,
              })}
            />
            <Stack.Screen name="ScreenOptions">
              {(props) => <OptionsSubMenu options={moreRoutes} {...props}></OptionsSubMenu>}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </ContextSuperUser.Consumer>
    </SuperUserProvider>
  );
};
MoreOptionsNavigator.propTypes = {
  navigation: PropTypes.object,
  moreRoutes: PropTypes.array,
};
