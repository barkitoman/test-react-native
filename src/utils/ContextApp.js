import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:4001';

const initialValue = [];

export const ContextApp = createContext({ initialValue });

export const AppProvider = ({ children }) => {
  const [tags, setTags] = useState(initialValue);

  const getTags = async () => {
    try {
      const socket = socketIOClient(ENDPOINT);
      socket.on('Tags', (data) => {
        setTags(data);
      });

      // const allTags = await API.tags.getTags();
      // if (Array.isArray(allTags)) {
      //   setTags(allTags);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const userDataValue = useMemo(() => ({ tags, getTags }), [tags]);
  return <ContextApp.Provider value={userDataValue}>{children}</ContextApp.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.any,
};
