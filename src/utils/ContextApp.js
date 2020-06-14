import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

const initialValue = null;

export const ContextApp = createContext({ initialValue });

export const AppProvider = ({ children }) => {
  const [post, setPost] = useState(initialValue);

  const savePosts = () => {};

  const userDataValue = useMemo(() => ({ savePosts, post }), [post]);
  return <ContextApp.Provider value={userDataValue}>{children}</ContextApp.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.any,
};
