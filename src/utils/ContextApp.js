import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';
import API from './Api';

const initialValue = null;

export const ContextApp = createContext({ initialValue });

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialValue);

  const setPost = (posts) => {
    setPosts(posts);
  };

  const getAllPosts = async () => {
    const allPost = await API.post.getPosts();
    if (Array.isArray(allPost)) {
      setPosts(allPost);
    }
  };

  const userDataValue = useMemo(() => ({ setPost, posts, getAllPosts }), [posts]);
  return <ContextApp.Provider value={userDataValue}>{children}</ContextApp.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.any,
};
