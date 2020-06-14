import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import LoadingLayout from '../../components/Loading';
import { ContextApp } from '../../utils/ContextApp';

const Loading = ({ navigation, route }) => {
  const { onLogin, user, clearSession } = useContext(ContextApp);

  const getPost = async () => {
    try {
    } catch (error) {
      // navigation.navigate('Login');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getPost();
    }, []),
  );

  return <LoadingLayout />;
};

Loading.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Loading;
