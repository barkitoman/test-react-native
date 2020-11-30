import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { LoadingLayout } from '../../components';
import { ContextApp } from '../../utils/ContextApp';

const Loading = ({ navigation, route }) => {
  const { getTags } = useContext(ContextApp);

  const getPost = async () => {
    try {
      getTags();
      navigation.navigate('ListTags');
    } catch (error) {
      console.log('We have an error from service');
      navigation.navigate('Error');
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return <LoadingLayout />;
};

Loading.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Loading;
