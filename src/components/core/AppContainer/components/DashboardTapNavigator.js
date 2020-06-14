/* eslint-disable react/prop-types */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { imageDisplay } from '../../../../../assets/images';
import Dashboard from '../../../../screens/dashboard/Dashboard';
import { ContextApp } from '../../../../utils/ContextApp';
import { ApprovalsNavigator } from './ApprovalsNavigator';
import { ItemsMenu } from './ItemsMenu';
import { MoreOptionsNavigator } from './MoreOptionsNavigator';

const Tab = createBottomTabNavigator();

const IconMenuNavigator = ({ name }) => {
  return <Image source={name} style={styles.image} />;
};

export const DashboardTapNavigator = ({ navigation, route }) => {
  const { user } = useContext(ContextApp);
  const [routes, setRoutes] = useState([
    <Tab.Screen name="Dashboard" key="Dashboard" component={Dashboard} />,
    <Tab.Screen name="Approvals" key="Approvals" component={ApprovalsNavigator} />,
    // <Stack.Screen name="Facility">{(props) => <Facility {...props}></Facility>}</Stack.Screen>
    // <Tab.Screen name="Facilities" key="Facilities" component={ListFacilities} />,
  ]);

  const renderIconMenuNavigator = (props, item) => {
    return (
      <IconMenuNavigator
        name={imageDisplay[`${item.obj}${props.focused ? 'Active' : ''}`]}
      ></IconMenuNavigator>
    );
  };

  const renderImage = (props) => {
    return <Image source={imageDisplay[`More${props.focused ? 'Active' : ''}`]} style={styles.image} />;
  };

  const calculateRoutes = (roles) => {
    const routes = ItemsMenu.reduce((prev, item, index) => {
      if (roles.indexOf(item.requirement) > -1) {
        prev.push(
          <Tab.Screen
            name={item.obj}
            component={item.component}
            order={item.order}
            key={index}
            options={{
              tabBarIcon: (props) => {
                return renderIconMenuNavigator(props, item);
              },
              tabBarLabel: item.title,
            }}
          />,
        );
        return prev;
      }
      return prev;
    }, []);

    routes.sort((a, b) => a.props.order - b.props.order);
    // Add more
    if (routes.length > 5) {
      const moreRoutes = routes.splice(4);
      routes.push(
        <Tab.Screen
          name="More"
          key="More"
          options={{
            tabBarIcon: (props) => {
              return renderImage(props);
            },
            tabBarLabel: 'More',
          }}
        >
          {(props) => <MoreOptionsNavigator {...props} moreRoutes={moreRoutes} />}
        </Tab.Screen>,
      );
    }
    return routes;
  };

  useEffect(() => {
    setMenu();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      goToApprovals();
    }, []),
  );

  const goToApprovals = () => {
    if (route.params && route.params.fromEmail) {
      navigation.jumpTo('Approvals', { screen: route.params.fromEmail });
    }
  };

  const setMenu = async () => {
    const session = await Auth.currentSession();
    setRoutes(calculateRoutes(session.idToken.payload['cognito:groups']));
  };

  return (
    <Tab.Navigator
      backBehavior="history"
      removeClippedSubviews="true"
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#0164C3',
        inactiveBackgroundColor: '#0164C3',
        inactiveTintColor: '#689CE6',
        pressOpacity: 0.5,
        allowFontScaling: true,
        style: { height: '10%' },
        tabStyle: { margin: 0 },
        labelStyle: { marginBottom: 10 },
        adaptive: true,
      }}
    >
      {routes}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
