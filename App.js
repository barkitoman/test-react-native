import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { AppContainer } from './src/components/core';
import { theme } from './src/styles/theme';
import { AppProvider, ContextApp } from './src/utils/ContextApp';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
          {({ tags }) => (
            <ThemeProvider theme={theme}>{fontsLoaded && <AppContainer tags={tags} />}</ThemeProvider>
          )}
        </ContextApp.Consumer>
      </AppProvider>
    </View>
  );
};

export default App;
