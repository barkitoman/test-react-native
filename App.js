import * as Font from 'expo-font';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { AppContainer } from './src/components/core';
import { theme } from './src/styles/theme';
import { AppProvider, ContextApp } from './src/utils/ContextApp';
const db = SQLite.openDatabase('db.db');

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS favorites (id PRIMARY KEY, body NOT NULL);');
    });
  }, []);

  const fetchFont = async () => {
    await Font.loadAsync({
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });

    setFontsLoaded(true);
  };

  useEffect(() => {
    fetchFont(fontsLoaded);
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <AppProvider>
        <ContextApp.Consumer>
          {({ user }) => (
            <ThemeProvider theme={theme}>{fontsLoaded && <AppContainer user={user} />}</ThemeProvider>
          )}
        </ContextApp.Consumer>
      </AppProvider>
    </View>
  );
};

export default App;
