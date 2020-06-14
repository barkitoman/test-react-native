import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { TopTapNavigator } from '../../../TopTapNavigator';
import { SpecialRequestStack } from './SpecialRequestStack';
import { VisitorRequestStack } from './VisitorRequestStack';

const Tab = createMaterialTopTabNavigator();

export const RequestNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TopTapNavigator {...props} />}>
      <Tab.Screen name="Zones">
        {(props) => <SpecialRequestStack {...props}></SpecialRequestStack>}
      </Tab.Screen>
      <Tab.Screen name="Visitor">
        {(props) => <VisitorRequestStack {...props}></VisitorRequestStack>}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
