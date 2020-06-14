import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import AddZone from '../../../../screens/addZone/AddZone';
import RequestSpecialAccess from '../../../../screens/requestSpecialAccess/RequestSpecialAccess';
import SpecialAccessList from '../../../../screens/specialAccessList/SpecialAccessList';
import { ContextSuperUser, SuperUserProvider } from '../context/ContextSuperUser';

const Stack = createStackNavigator();

export const SpecialRequestStack = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (_) => {
      navigation.navigate('SpecialAccessList');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SuperUserProvider>
      <ContextSuperUser.Consumer>
        {() => (
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="SpecialAccessList" component={SpecialAccessList} />
            <Stack.Screen name="RequestSpecialAccess" component={RequestSpecialAccess} />
            <Stack.Screen name="AddZonesForSpecialAccess" component={AddZone} />
          </Stack.Navigator>
        )}
      </ContextSuperUser.Consumer>
    </SuperUserProvider>
  );
};

SpecialRequestStack.propTypes = {
  navigation: PropTypes.object,
};
