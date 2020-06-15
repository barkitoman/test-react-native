import * as SQLite from 'expo-sqlite';
import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';
import API from './Api';

const db = SQLite.openDatabase('db.db');

const initialValue = null;

export const ContextApp = createContext({ initialValue });

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialValue);
  const [postSelected, setPostSelected] = useState(initialValue);

  const setPost = (post) => {
    setPostSelected(post);
    const newPostList = posts.map((item) => {
      if (item.id == post.id) {
        return post;
      }
      return item;
    });
    setPosts(newPostList);
  };

  const getAllPosts = async () => {
    const allPost = await API.post.getPosts();
    if (Array.isArray(allPost)) {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM favorites', [], (_, { rows: { _array } }) => {
          const post = allPost.map((item, i) => {
            const newItem = item;
            newItem.wasReading = i < 20 ? false : true;
            newItem.isFavorite = _array.some((favorite) => favorite.id == item.id);
            return newItem;
          });
          setPosts(post);
        });
      });
    }
  };

  const userDataValue = useMemo(() => ({ posts, getAllPosts, setPost, postSelected }), [posts, postSelected]);
  return <ContextApp.Provider value={userDataValue}>{children}</ContextApp.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.any,
};
