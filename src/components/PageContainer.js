/* eslint-disable no-case-declarations */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { colors, dimensions } from '../styles/base';
import { ContextApp } from '../utils/ContextApp';

const db = SQLite.openDatabase('db.db');

const PageContainerContent = ({ children, margin }) => {
  return <View style={[styles.contentPageContainer, { margin: margin }]}>{children}</View>;
};

export const PageContainer = (
  WrapperComponent,
  { title, backPath = false, favorite = false, refresh = false, hasScrollView = false, margin = 17 } = {},
) => {
  return ({ navigation, route, ...props }) => {
    const [loading, setLoading] = useState(false);
    const { getAllPosts, postSelected, setPost } = useContext(ContextApp);

    useEffect(() => {}, []);

    const navigateBack = () => {
      navigation.goBack();
    };

    const openMenu = () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    };

    const addRemoveToFavorite = () => {
      if (postSelected && !postSelected.isFavorite) {
        db.transaction(
          (tx) => {
            tx.executeSql('INSERT INTO favorites (id, body) values (?, ?)', [
              postSelected.id,
              postSelected.body,
            ]);
            tx.executeSql('SELECT * FROM favorites', [], (_, { rows }) => console.log(JSON.stringify(rows)));
          },
          null,
          () => {
            postSelected.isFavorite = true;
            setPost(postSelected);
          },
        );
      } else if (postSelected && postSelected.isFavorite) {
        db.transaction(
          (tx) => {
            tx.executeSql(`DELETE FROM favorites where id = ?;`, [postSelected.id]);
            tx.executeSql('SELECT * FROM favorites', [], (_, { rows }) => console.log(JSON.stringify(rows)));
          },
          null,
          () => {
            postSelected.isFavorite = false;
            setPost(postSelected);
          },
        );
      }
    };

    const refreshPost = () => {
      getAllPosts();
    };

    const renderLeftIcon = () => {
      return (
        <TouchableOpacity style={styles.btnHeader}>
          <Icon name="ios-arrow-back" type="ionicon" color={colors.white} onPress={navigateBack} />
        </TouchableOpacity>
      );
    };

    const renderFavoriteIcon = () => {
      console.log(postSelected, 'sse');
      return (
        <TouchableOpacity style={styles.btnHeader}>
          {postSelected && postSelected.isFavorite && (
            <Icon name="ios-star" type="ionicon" color={colors.yellow} onPress={addRemoveToFavorite} />
          )}
          {postSelected && !postSelected.isFavorite && (
            <Icon name="ios-star-outline" type="ionicon" color={colors.white} onPress={addRemoveToFavorite} />
          )}
        </TouchableOpacity>
      );
    };

    const renderRefreshIcon = () => {
      return (
        <TouchableOpacity style={styles.btnHeader}>
          <MaterialCommunityIcons name="reload" size={25} color="white" onPress={refreshPost} />
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
