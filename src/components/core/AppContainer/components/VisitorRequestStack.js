import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import AddZone from '../../../../screens/addZone/AddZone';
import RequestVisitor from '../../../../screens/requestVisitor/RequestVisitor';
import VisitorsAccessList from '../../../../screens/visitorsAccessList/VisitorsAccessList';
import { ContextSuperUser, SuperUserProvider } from '../context/ContextSuperUser';

const Stack = createStackNavigator();

export const VisitorRequestStack = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      navigation.navigate('VisitorsAccessList');
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SuperUserProvider>
      <ContextSuperUser.Consumer>
        {() => (
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="VisitorsAccessList" component={VisitorsAccessList} />
            <Stack.Screen name="RequestVisitor" component={RequestVisitor} />
            <Stack.Screen name="AddZonesForVisitorAccess" component={AddZone} />
          </Stack.Navigator>
        )}
      </ContextSuperUser.Consumer>
    </SuperUserProvider>
  );
};
