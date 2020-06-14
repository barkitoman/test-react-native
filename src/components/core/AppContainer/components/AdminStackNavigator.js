import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Admin from '../../../../screens/admin/Admin';
import FacilityManager from '../../../../screens/facilityManager/FacilityManager';
import ListFacilityManager from '../../../../screens/listFacilityManager/ListFacilityManager';

const Stack = createStackNavigator();

export const AdminStackNavigator = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.navigate('ListFacilityManager');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="ListFacilityManager" component={ListFacilityManager} />
      <Stack.Screen name="FacilityManager" component={FacilityManager} />
    </Stack.Navigator>
  );
};

AdminStackNavigator.propTypes = {
  navigation: PropTypes.object,
};
