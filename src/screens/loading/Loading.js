import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { LoadingLayout } from '../../components';
import { ContextApp } from '../../utils/ContextApp';

const Loading = ({ navigation, route }) => {
  const { getAllPosts } = useContext(ContextApp);

  const getPost = async () => {
    try {
      getAllPosts();
      navigation.navigate('ListPost');
    } catch (error) {
      console.log('We have an error from service');
      navigation.navigate('Error');
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
