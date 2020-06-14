import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { NativeModules, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconHome from '../../../../../assets/svg/home.svg';
import ChangePasswordIcon from '../../../../../assets/svg/menu-change-password.svg';
import LogoutIcon from '../../../../../assets/svg/menu-logout.svg';
import FaceIcon from '../../../../../assets/svg/icon-face.svg';
import { colors, dimensions } from '../../../../styles/base';
import { ContextApp } from '../../../../utils/ContextApp';
import { camelCase, getLettersName } from '../../../../utils/Generalities';
import UserAvatar from '../../../UserAvatar';

const StatusUser = {
  ACTIVE: 1,
  NO_PICTURE: 2,
  PENDING: 3,
};

export const SideMenu = ({ isAdmin = false }) => {
  const { user, clearSession } = useContext(ContextApp);
  const [userMenu, setUserMenu] = useState({});
  const [shortName, setShortName] = useState('');
  const navigation = useNavigation();

  const setLayout = async () => {
    const sessionToken = await Auth.currentSession();
    const groups = sessionToken.accessToken.payload['cognito:groups'];
    if (groups.length > 1 && groups[0] != 'ADMIN') {
      const { user: dataUser } = user;
      setUserMenu(dataUser);
      setShortName(getLettersName(camelCase(dataUser.name)));
      switch (user.id) {
        case 17151:
          setShortName('DB');
          break;
        case 17152:
          setShortName('RB');
          break;
        case 17154:
          setShortName('JB');
          break;
        default:
          break;
      }
    } else {
      const sessionToken = await Auth.currentSession();
      setUserMenu({ name: 'ADMIN', company: sessionToken.idToken.payload.email });
      setShortName('A');
    }
  };

  useEffect(() => {
    setLayout();
  }, []);

  const navigateToScreen = (route, params) => async () => {
    try {
      if (route === 'Login' && Platform.OS === 'ios') {
        navigation.dispatch(DrawerActions.closeDrawer());
        await clearSession();
        NativeModules.DevSettings.reload();
      } else if (route === 'Login' && Platform.OS === 'android') {
        navigation.dispatch(DrawerActions.closeDrawer());
        await clearSession();
        navigation.navigate('Login');
      } else {
        navigation.navigate(route, params);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.userInfosHolder}>
          {userMenu && userMenu.imageProfile && userMenu.status === 'ACTIVE' && (
            <UserAvatar source={userMenu.imageProfile} size={100} />
          )}
          {!userMenu.imageProfile && <UserAvatar title={shortName} size={100} />}

          <View style={styles.userInfos}>
            <Text type="h1White" style={styles.username}>
              {userMenu.name}
            </Text>
            <Text type="h5White" style={styles.company}>
              {userMenu.company}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.content}>
      {/* <AWSpinner loading={loading}></AWSpinner> */}
      <View style={[styles.sideMenu || {}]}>
        <LinearGradient
          style={styles.gradient}
          colors={[colors.blueDark, colors.blueDark, colors.blueMid, colors.blueLight]}
        />
        <View style={styles.contentMenu}>
          <View>
            {renderHeader()}
            {!isAdmin && user.status == StatusUser.ACTIVE && (
              <TouchableOpacity style={styles.menu} onPress={navigateToScreen('Home')}>
                <IconHome width={20} height={20} fill={colors.white} />
                <Text style={styles.menuText}>{SideMenuStrings.home}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.menu}
              onPress={navigateToScreen('ChangePassword', { withCurrent: true, backPath: 'Loading' })}
            >
              <ChangePasswordIcon width={20} height={20} fill={colors.white} />
              <Text style={styles.menuText}>{SideMenuStrings.changePassword}</Text>
            </TouchableOpacity>
            {user && user.groups.includes('IDENTITY') && (
              <TouchableOpacity style={styles.menu} onPress={navigateToScreen('TakePicture')}>
                <FaceIcon width={20} height={20} fill={colors.white} />
                <Text style={styles.menuText}>{SideMenuStrings.changePicture}</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.menu} onPress={navigateToScreen('Login')}>
            <LogoutIcon width={20} height={20} fill={colors.white} />
            <Text style={styles.menuText}>{SideMenuStrings.logout}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.outSideMenu}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
        }}
      ></TouchableOpacity>
    </View>
  );
};

SideMenu.propTypes = {
  navigation: PropTypes.object,
  isAdmin: PropTypes.any,
};

const SideMenuStrings = {
  home: 'Home',
  changePicture: 'Change Picture',
  changePassword: 'Change Password',
  logout: 'Logout',
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  sideMenu: {
    width: 230,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  outSideMenu: {
    width: dimensions.fullWidth - 230,
    backgroundColor: 'transparent',
  },
  contentMenu: {
    flex: 1,
    color: colors.white,
    justifyContent: 'space-between',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  sideMenuTitle: {
    marginLeft: 20,
    marginBottom: 30,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 14,
    color: colors.white,
  },
  header: {
    marginTop: 60,
    marginBottom: 20,
  },
  userInfosHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userInfos: {
    height: 50,
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 28,
  },
  username: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    color: colors.white,
  },
  company: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
});
