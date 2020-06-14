/* eslint-disable no-case-declarations */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useReducer } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { colors, dimensions } from '../styles/base';
import { ContextApp } from '../utils/ContextApp';
import { camelCase, getLettersName } from '../utils/Generalities';

const PageContainerContent = ({ children, margin }) => {
  return <View style={[styles.contentPageContainer, { margin: margin }]}>{children}</View>;
};

export const PageContainer = (
  WrapperComponent,
  { title, backPath = false, favorite = false, refresh = false, hasScrollView = false, margin = 17 } = {},
) => {
  return ({ navigation, route, ...props }) => {
    const initalSt = { ...initialState };
    const [state, dispatch] = useReducer(reducer, initalSt);
    const { name, shortName, company } = state;
    const { user } = useContext(ContextApp);

    const triggerDispatch = (type, payload) => {
      dispatch({ type, payload });
    };

    const setLayout = () => {
      if (user) {
        const { user: dataUser } = user;
        if (dataUser) {
          const userConfig = {
            name: camelCase(dataUser.name),
            shortName: getLettersName(camelCase(dataUser.name)),
            company: dataUser.company,
          };
          triggerDispatch(SET_USER, userConfig);
          switch (dataUser.id) {
            case 17151:
              triggerDispatch(SET_SHORT_NAME, 'DB');
              break;
            case 17152:
              triggerDispatch(SET_SHORT_NAME, 'RB');
              break;
            case 17154:
              triggerDispatch(SET_SHORT_NAME, 'JB');
              break;
            default:
              break;
          }
        }
      }
    };

    useEffect(() => {
      setLayout();
    }, []);

    const navigateBack = () => {
      navigation.goBack();
    };

    const openMenu = () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    };

    const addToFavorite = () => {};

    const refreshPost = () => {};

    const renderLeftIcon = () => {
      return (
        <TouchableOpacity style={styles.btnHeader}>
          <Icon name="ios-arrow-back" type="ionicon" color={colors.white} onPress={navigateBack} />
        </TouchableOpacity>
      );
    };

    const renderFavoriteIcon = () => {
      return (
        <TouchableOpacity style={styles.btnHeader}>
          <Icon name="ios-star-outline" type="ionicon" color={colors.white} onPress={addToFavorite} />
        </TouchableOpacity>
      );
    };

    const renderRefreshIcon = () => {
      return (
        <TouchableOpacity style={styles.btnHeader}>
          <MaterialCommunityIcons name="reload" size={25} color="white" />
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header backgroundColor={colors.green} containerStyle={{ borderBottomWidth: 0, paddingBottom: 10 }}>
          {backPath && renderLeftIcon()}
          {title && <Text style={{ color: colors.white }}>{title}</Text>}
          {favorite ? renderFavoriteIcon() : renderRefreshIcon()}
        </Header>
        {hasScrollView ? (
          <ScrollView alwaysBounceVertical={false}>
            <PageContainerContent margin={margin}>
              <WrapperComponent navigation={navigation} route={route} backPath={backPath} {...props} />
            </PageContainerContent>
          </ScrollView>
        ) : (
          <PageContainerContent margin={margin}>
            <WrapperComponent navigation={navigation} route={route} backPath={backPath} {...props} />
          </PageContainerContent>
        )}
      </SafeAreaView>
    );
  };
};

const initialState = {
  name: '',
  shortName: '',
  company: '',
};

const ACTIONS = {
  SET_USER: 'setUser',
  SET_SHORT_NAME: 'setShorName',
};

const { SET_USER, SET_SHORT_NAME } = ACTIONS;

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      const { name, shortName, company } = payload;
      return { ...state, name, shortName, company };
    case SET_SHORT_NAME:
      return { ...state, shortName: payload };
  }
};

const styles = StyleSheet.create({
  contentPageContainer: { flex: 1, margin: 17, backgroundColor: colors.white },
  safeArea: {
    flex: 1,
    backgroundColor: colors.green,
    paddingTop: Constants.statusBarHeight,
    height: dimensions.fullHeight,
    position: 'relative',
  },
  btnHeader: {
    width: 30,
    zIndex: 100,
  },
});

PageContainerContent.propTypes = {
  children: PropTypes.any,
  margin: PropTypes.number,
};
